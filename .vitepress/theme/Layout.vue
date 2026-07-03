<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import GiscusComment from './components/GiscusComment.vue'

const { page, frontmatter } = useData()
const isPost = computed(() => {
  return page.value.relativePath.startsWith('posts/')
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <GiscusComment v-if="isPost" />
    </template>
  </DefaultTheme.Layout>
</template>
