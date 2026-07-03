<template>
  <div class="giscus-wrapper" ref="giscusContainer"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()
const giscusContainer = ref(null)

onMounted(() => {
  const giscusConfig = theme.value.giscus
  if (!giscusConfig?.repo) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', giscusConfig.repo)
  script.setAttribute('data-repo-id', giscusConfig.repoId)
  script.setAttribute('data-category', giscusConfig.category)
  script.setAttribute('data-category-id', giscusConfig.categoryId)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  giscusContainer.value?.appendChild(script)
})

watch(() => route.path, () => {
  const container = giscusContainer.value
  if (!container) return
  // 路由变化时重新加载 Giscus
  container.innerHTML = ''
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  const giscusConfig = theme.value.giscus
  if (!giscusConfig?.repo) return
  script.setAttribute('data-repo', giscusConfig.repo)
  script.setAttribute('data-repo-id', giscusConfig.repoId)
  script.setAttribute('data-category', giscusConfig.category)
  script.setAttribute('data-category-id', giscusConfig.categoryId)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  container.appendChild(script)
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
