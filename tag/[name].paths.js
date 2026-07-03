import { readdirSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = resolve(__dirname, '../posts')

function parseTags(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return []
  const yaml = match[1]
  const tagsMatch = yaml.match(/^tags:\s*\[(.+)\]$/m)
  if (!tagsMatch) return []
  return tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''))
}

export default {
  async paths() {
    const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))
    const tags = [...new Set(files.flatMap(f => parseTags(resolve(postsDir, f))))]
    return tags.map(tag => ({ params: { name: tag } }))
  }
}
