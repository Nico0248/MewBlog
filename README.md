# MewBlog

个人博客，技术学习与生活思考。VitePress + Vue 3 + Giscus，部署在 GitHub Pages。

## 写一篇文章

1. 在 `posts/` 下新建 Markdown 文件，比如 `posts/my-post.md`
2. 顶部写上 frontmatter：

```yaml
---
title: 文章标题
date: 2026-07-03
category: tech        # tech 或 life
tags: [vue, 学习笔记]
summary: 文章的简短摘要，会显示在首页列表
---
```

3. 下面正常写 Markdown 正文
4. 保存 → `git add -A` → `git commit -m "post: xxx"` → `git push`
5. 等 GitHub Actions 跑完，博客自动更新

## 本地预览

```bash
npm install        # 首次或依赖有变化时
npm run docs:dev   # 启动开发服务器，默认 http://localhost:5173
npm run docs:build # 构建生产版本
```

## 目录结构

```
blog/
├── posts/                     # 📝 文章放这里（Markdown + frontmatter）
│   └── hello-world.md
├── category/[name].md         # 分类页（自动按 frontmatter category 过滤）
├── tag/[name].md              # 标签页（自动按 frontmatter tags 过滤）
├── index.md                   # 🏠 首页（文章列表 + 分类/标签筛选）
├── about.md                   # 👤 关于我
├── .vitepress/
│   ├── config.mjs             # 站点配置（导航、Giscus、RSS、base 路径）
│   └── theme/
│       ├── index.js           # 主题入口
│       ├── Layout.vue         # 自定义布局（文章底部插入评论）
│       └── components/
│           └── GiscusComment.vue  # 评论区组件
├── .github/workflows/
│   └── deploy.yml             # CI/CD（push main → build → 部署，失败自动重试 5 次）
└── package.json
```

## 修改站点配置

编辑 `.vitepress/config.mjs`：

- **站点标题**：改 `SITE_TITLE`
- **Giscus 参数**：改 `giscus` 对象
- **导航栏**：改 `themeConfig.nav`
- **站点 URL**：改 `SITE_URL`（换域名或仓库名时）

## 技术栈

| 层 | 选型 |
|---|---|
| 站点生成 | VitePress |
| 前端框架 | Vue 3 |
| 评论系统 | Giscus（GitHub Discussions） |
| 托管 | GitHub Pages |
| CI/CD | GitHub Actions（自动重试 5 次） |
| RSS | 构建时自动生成 |
