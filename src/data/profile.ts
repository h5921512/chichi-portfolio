/**
 * 個人資料。標記 TODO 的欄位為佔位，等定案後由本人提供。
 */
export const profile = {
  nameEn: 'Chi Chi-Feng', // TODO: 確認英文拼法
  nameZh: '紀棋峰',
  title: 'Unity / VR Developer', // TODO: 確認職稱
  eyebrow: 'Unity · VR · Interaction developer',
  headlineEn: 'Building spaces you can walk into.',
  headlineZh: 'Unity互動工程師',
  bio: 'Unity / VR 互動開發者。從大二把手機變成球體控制器，到畢業專題透過揮臂在太空站跑酷，持續探索更直覺的互動方式，讓使用者以簡單的操作，獲得自然的回饋。\n曾任職於 Sophon 與有日互動，累積 Unity 與 VR 專案開發經驗，目前為自由接案者。開發過程中運用 Codex 協助實作與驗證，提升開發效率，並深入探索專案的技術與互動細節。',
  facts: [
    { label: 'Based in', value: 'Taichung, Taiwan' },
    { label: 'Focus', value: 'Unity, XR interaction, level design' },
    { label: 'Status', value: 'Open to work', accent: true }, // TODO: 確認
    { label: 'Award', value: '金點新秀設計獎 · 2024' },
  ],
  skills: [
    'Unity', 'C#', 'XR Interaction Toolkit', 'Oculus / HTC Vive',
    'ExtOSC', 'URP / Shader', 'Git', 'Odin',
  ], // TODO: 確認技能清單
  experience: [
    { period: '2026–現在', title: '自由接案', note: 'A Black Climbing Dog\nMuze XR：部分功能外包協助' },
    { period: '2024–2025', title: 'sophon 智子娛樂 · Unity 工程師', note: 'wave' },
    { period: '2022–2024', title: '有日互動 · Unity 工程師', note: 'VR 虛擬商城、VR CPR 教學與其餘專案協助' },
    { period: '2020–2024', title: '台北科技大學互動學系', note: '畢業專題 Explorer' },
  ],
  awards: [
    { period: '2024', title: '金點新秀設計獎', note: '數位互動設計類 · Explorer' },
  ],
  email: 'h5921512@gmail.com',
  links: [
    { label: 'GitLab', value: 'gitlab.com/h5921512', href: 'https://gitlab.com/h5921512' },
  ],
  resumeHref: '', // TODO: 履歷 PDF 路徑，放在 public/ 下
  contactLead: '正在尋找 Unity / VR 相關的正職或合作機會。專案洽談、技術交流都歡迎來信。', // TODO
  location: 'Taichung · UTC+8',
} as const
