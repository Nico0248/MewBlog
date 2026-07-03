---
layout: page
---

<script setup>
import { data as posts } from '../posts.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { params } = useData()
const categoryName = computed(() => params.value.name)
const categoryLabel = computed(() => categoryName.value === 'tech' ? '技术' : '生活')

const filteredPosts = computed(() =>
  posts.filter(p => p.category === categoryName.value)
)
</script>

<h1>📂 {{ categoryLabel }}</h1>

<div v-if="filteredPosts.length === 0" class="no-posts">
  还没有{{ categoryLabel }}分类的文章。
</div>

<div v-for="post in filteredPosts" :key="post.url" class="post-card">
  <span class="post-date">{{ new Date(post.date).toLocaleDateString('zh-CN') }}</span>
  <a :href="post.url" class="post-title">{{ post.title }}</a>
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
