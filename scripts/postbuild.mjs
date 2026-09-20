// GitHub Pages 是純靜態主機：直接開 /chichi-portfolio/works/explorer 會回 404。
// 把 index.html 複製成 404.html，讓 GitHub Pages 在找不到檔案時仍載入 app，
// 由 TanStack Router 在瀏規器端接手路由。
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const index = resolve(dist, 'index.html')

if (!existsSync(index)) {
  console.error('postbuild: dist/index.html 不存在，請先執行 vite build')
  process.exit(1)
}

copyFileSync(index, resolve(dist, '404.html'))
// 關閉 GitHub Pages 的 Jekyll 處理，避免以 _ 開頭的資產被忽略
writeFileSync(resolve(dist, '.nojekyll'), '')
console.log('postbuild: 已建立 dist/404.html 與 dist/.nojekyll')
