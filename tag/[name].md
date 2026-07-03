---
layout: page
---

<script setup>
import { data as posts } from '../posts.data.mjs'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { params } = useData()

const filteredPosts = computed(() =>
  posts.filter(p => p.tags.includes(params.value.name))
)
</script>

<h1>🏷 #{{ params.name }}</h1>

<div v-if="filteredPosts.length === 0" class="no-posts">
  还没有带 #{{ params.name }} 标签的文章。
</div>

<div v-for="post in filteredPosts" :key="post.url" class="post-card">
  <span class="post-date">{{ new Date(post.date).toLocaleDateString('zh-CN') }}</span>
  <span class="post-category" :class="post.category">
    {{ post.category === 'tech' ? '技术' : '生活' }}
  </span>
  <a :href="withBase(post.url)" class="post-title">{{ post.title }}</a>
  <p class="post-summary">{{ post.summary }}</p>
  <div class="post-tags">
    <span v-for="tag in post.tags" :key="tag" class="tag-badge">#{{ tag }}</span>
  </div>
</div>

<style scoped>
.no-posts {
  color: var(--vp-c-text-2);
  padding: 48px 0;
}

.post-card {
  padding: 24px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-card:last-child {
  border-bottom: none;
}

.post-date {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-right: 12px;
}

.post-category {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.post-category.tech {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.post-category.life {
  background: var(--vp-c-tip-soft);
  color: var(--vp-c-tip);
}

.post-title {
  display: block;
  margin-top: 6px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title:hover {
  color: var(--vp-c-brand);
}

.post-summary {
  margin-top: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.post-tags {
  margin-top: 8px;
  display: flex;
  gap: 6px;
}

.tag-badge {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
