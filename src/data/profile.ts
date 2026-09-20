/**
 * 個人資料。標記 TODO 的欄位為佔位，等定案後由本人提供。
 */
export const profile = {
  nameEn: 'Chi Chi-Feng', // TODO: 確認英文拼法
  nameZh: '紀棋峰',
  title: 'Unity / VR Developer', // TODO: 確認職稱
  eyebrow: 'Unity · VR · Interaction developer',
  headlineEn: 'Building spaces you can walk into.',
  headlineZh: '我做可以走進去的互動空間。',
  // TODO: 自介 100–200 字
  bio: 'Unity / VR 互動開發者。從大二把手機變成球體控制器，到畢業專題用揮臂在太空站跑酷，我一直在找更直覺的操作方式。曾於有日互動開發 VR 虛擬商城，與後端合作蒐集使用者行為數據。',
  facts: [
    { label: 'Based in', value: 'Taipei, Taiwan' }, // TODO
    { label: 'Focus', value: 'Unity, XR interaction, level design' },
    { label: 'Status', value: 'Open to work', accent: true }, // TODO: 確認
    { label: 'Award', value: '金點新秀設計獎 · 2024' },
  ],
  skills: [
    'Unity', 'C#', 'XR Interaction Toolkit', 'Oculus / Quest',
    'ExtOSC', 'URP / Shader', 'Git', 'Blender',
  ], // TODO: 確認技能清單
  experience: [
    { period: '2023–24', title: '有日互動 · Unity 工程師', note: 'VR 虛擬商城、後端資料串接' }, // TODO: 確認
    { period: '2020–24', title: '＿＿大學 ＿＿學系', note: '畢業專題 Explorer' }, // TODO
  ],
  awards: [
    { period: '2024', title: '金點新秀設計獎', note: '數位互動設計類 · Explorer' },
  ],
  email: 'email@example.com', // TODO
  links: [
    { label: 'GitLab', value: 'gitlab.com/＿＿', href: '#' }, // TODO
    { label: 'YouTube', value: '＿＿', href: '#' }, // TODO
    { label: 'LinkedIn', value: '＿＿', href: '#' }, // TODO
  ],
  resumeHref: '', // TODO: 履歷 PDF 路徑，放在 public/ 下
  contactLead: '正在尋找 Unity / VR 相關的正職或合作機會。專案洽談、技術交流都歡迎來信。', // TODO
  location: 'Taipei · UTC+8',
} as const
