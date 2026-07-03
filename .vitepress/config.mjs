import { defineConfig, createContentLoader } from 'vitepress'
import { writeFileSync } from 'fs'
import { join } from 'path'

// 站点 URL
const SITE_URL = 'https://nico0248.github.io/MewBlog'
const SITE_TITLE = 'Niko 的博客'
const SITE_DESCRIPTION = '技术学习与生活思考'

// Giscus 参数
const giscus = {
  repo: 'Nico0248/MewBlog',
  repoId: 'R_kgDOTMWKsg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOTMWKss4DAaTc',
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,

  // GitHub Pages 子路径前缀
  base: '/MewBlog/',

  // 主题配置
  appearance: true, // 暗色/亮色模式

  // 构建时自动生成 RSS
  async buildEnd(siteConfig) {
    const posts = await createContentLoader('posts/*.md', {
      excerpt: true,
      transform(raw) {
        return raw
          .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
          .map((page) => ({
            title: page.frontmatter.title,
            url: `${SITE_URL}/${page.url.replace(/\.md$/, '')}`,
            date: page.frontmatter.date,
            description: page.frontmatter.summary || page.excerpt?.replace(/<[^>]*>/g, '').slice(0, 200) || '',
          }))
      },
    }).load()

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(p => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${p.url}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`

    writeFileSync(join(siteConfig.outDir, 'feed.xml'), rss)
  },

  // 顶部导航
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术', link: '/category/tech' },
      { text: '生活', link: '/category/life' },
      { text: '关于', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],

    // Giscus 评论（传递给 GiscusComment 组件）
    giscus,
  },
})

// XML 特殊字符转义
function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
