import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// GitHub Pages：repo 為 chichi-portfolio，網址會是 https://<user>.github.io/chichi-portfolio/
// 若日後改用自訂網域或 <user>.github.io 這個 repo，把 base 改成 '/'。
export default defineConfig({
  base: '/chichi-portfolio/',
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
})
