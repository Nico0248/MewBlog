---
layout: home
---

<script setup>
import { data as posts } from './posts.data.mjs'
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import NewsletterSignup from './.vitepress/theme/components/NewsletterSignup.vue'

const activeCategory = ref('all')
const activeTag = ref('')

const categories = ['all', 'tech', 'life']

const filteredPosts = computed(() => {
  let result = posts
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value)
  }
  if (activeTag.value) {
    result = result.filter(p => p.tags.includes(activeTag.value))
  }
  return result
})

function filterByCategory(cat) {
  activeCategory.value = cat
  activeTag.value = ''
}

function filterByTag(tag) {
  activeTag.value = activeTag.value === tag ? '' : tag
}
</script>

# 👋 Niko 的博客

技术学习与生活思考

<NewsletterSignup />

<div class="filters">
  <div class="category-filters">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="{ active: activeCategory === cat }"
      @click="filterByCategory(cat)"
    >
      {{ cat === 'all' ? '全部' : cat === 'tech' ? '技术' : '生活' }}
    </button>
  </div>
</div>

<div v-if="filteredPosts.length === 0" class="no-posts">
  还没有文章，敬请期待。
</div>

<div v-for="post in filteredPosts" :key="post.url" class="post-card">
  <span class="post-date">{{ new Date(post.date).toLocaleDateString('zh-CN') }}</span>
  <span class="post-category" :class="post.category">
    {{ post.category === 'tech' ? '技术' : '生活' }}
  </span>
  <a :href="withBase(post.url)" class="post-title">{{ post.title }}</a>
  <p class="post-summary">{{ post.summary }}</p>
  <div class="post-tags">
    <span
      v-for="tag in post.tags"
      :key="tag"
      :class="{ active: activeTag === tag }"
      class="tag-badge"
      @click="filterByTag(tag)"
    >#{{ tag }}</span>
  </div>
</div>

<style scoped>
.filters {
  margin: 24px 0;
}

.category-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-filters button {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.category-filters button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.category-filters button.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-white);
}

.no-posts {
  color: var(--vp-c-text-2);
  padding: 48px 0;
  text-align: center;
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
  margin-top: 8px;
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
  flex-wrap: wrap;
}

.tag-badge {
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;
}

.tag-badge:hover,
.tag-badge.active {
  color: var(--vp-c-brand);
}
</style>
