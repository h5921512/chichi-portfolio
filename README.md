# chichi-portfolio

紀棋峰（Chi Chi-Feng）的作品集網站。Vite + React 19 + TypeScript + Tailwind CSS v4 + TanStack Router，部署於 GitHub Pages。

## 開發

```bash
npm install
npm run dev        # http://localhost:5173/chichi-portfolio/
npm run typecheck  # tsc
npm run build      # tsc → vite build → 產生 dist/404.html 與 .nojekyll
npm run preview
```

## 頁面

| 路徑 | 檔案 | 內容 |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | About：定位、自介、個人照、技能、經歷、獎項 |
| `/works` | `src/routes/works.index.tsx` | Works：橫向滑頁卡片 + 索引表 |
| `/works/$slug` | `src/routes/works.$slug.tsx` | 作品內頁：資訊欄、主圖、理念、操作、圖庫、上下一件 |
| `/contact` | `src/routes/contact.tsx` | Contact：Email、連結、履歷 |

`src/routeTree.gen.ts` 由 `@tanstack/router-plugin` 在 dev / build 時自動產生，請勿手動編輯。

## 要更新內容時改哪裡

- 個人資料、聯絡方式、技能、經歷：`src/data/profile.ts`（標 `TODO` 的欄位為佔位）
- 作品文字與圖片：`src/data/works.ts`，圖片放在 `src/assets/works/`
  - 目前的圖片是從原 PDF 取出的壓縮版，請以高解析原圖同名替換
- 個人照：放到 `src/assets/portrait.jpg`，並把 `src/routes/index.tsx` 中的佔位方塊改為 `<img>`
- 履歷 PDF：放進 `public/`，並在 `profile.ts` 設定 `resumeHref`（例如 `/chichi-portfolio/resume.pdf`）
- 配色與字體：`src/index.css` 的 `@theme` 區塊（目前為 D 案 v4「Sand」，字體 Manrope + Noto Sans TC + Geist Mono）

## 部署（GitHub Pages）

1. 在 GitHub 建立 repo `chichi-portfolio`，把本資料夾（`portfolio/`）作為 repo 根目錄推上 `main`。
2. Repo → Settings → Pages → Source 選 **GitHub Actions**。
3. 之後每次 push 到 `main`，`.github/workflows/deploy.yml` 會自動建置並發佈到
   `https://<你的帳號>.github.io/chichi-portfolio/`。

`vite.config.ts` 的 `base` 與 router 的 `basepath` 皆對應 `/chichi-portfolio/`；若改用自訂網域或改 repo 名稱，兩處只需改 `base` 一個值。
`scripts/postbuild.mjs` 會把 `index.html` 複製為 `404.html`，讓直接開啟 `/works/explorer` 這類深層連結也能運作。
