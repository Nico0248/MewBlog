<template>
  <div class="giscus-wrapper" ref="giscusContainer"></div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme, isDark } = useData()
const route = useRoute()
const giscusContainer = ref(null)

function getGiscusTheme() {
  return isDark.value ? 'dark' : 'light'
}

function loadGiscus() {
  const container = giscusContainer.value
  if (!container) return

  const giscusConfig = theme.value.giscus
  if (!giscusConfig?.repo) return

  container.innerHTML = ''
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
  script.setAttribute('data-theme', getGiscusTheme())
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  container.appendChild(script)
}

// 发送主题切换消息给 Giscus iframe（无需重新加载）
function sendThemeToGiscus() {
  const iframe = document.querySelector('.giscus-wrapper iframe')
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage({
    giscus: {
      setConfig: {
        theme: getGiscusTheme()
      }
    }
  }, 'https://giscus.app')
}

onMounted(() => {
  loadGiscus()
  // 监听 Giscus 加载完成，之后主题切换用 postMessage 即可
  window.addEventListener('message', function handler(event) {
    if (event.origin !== 'https://giscus.app') return
    if (event.data?.giscus?.discussion) {
      window.removeEventListener('message', handler)
    }
  })
})

// 主题切换时更新 Giscus 主题
watch(isDark, () => {
  nextTick(() => sendThemeToGiscus())
})

// 路由变化时重新加载 Giscus
watch(() => route.path, () => {
  nextTick(() => loadGiscus())
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
