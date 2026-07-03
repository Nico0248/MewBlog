import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map((page) => ({
        title: page.frontmatter.title,
        url: page.url,
        date: page.frontmatter.date,
        category: page.frontmatter.category || 'life',
        tags: page.frontmatter.tags || [],
        summary: page.frontmatter.summary || page.excerpt?.replace(/<[^>]*>/g, '').slice(0, 150) || '',
      }))
  },
})
