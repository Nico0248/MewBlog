import { readdirSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = resolve(__dirname, '../posts')

function parseFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const yaml = match[1]
  const catMatch = yaml.match(/^category:\s*(.+)$/m)
  return { category: catMatch ? catMatch[1].trim() : 'life' }
}

export default {
  async paths() {
    const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))
    const categories = [...new Set(files.map(f => parseFrontmatter(resolve(postsDir, f)).category))]
    return categories.map(cat => ({ params: { name: cat } }))
  }
}
