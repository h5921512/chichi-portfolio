import explorer01 from '../assets/works/explorer-01.jpg'
import explorer02 from '../assets/works/explorer-02.jpg'
import explorer03 from '../assets/works/explorer-03.jpg'
import sophon01 from '../assets/works/sophon-01.jpg'
import sophon02 from '../assets/works/sophon-02.jpg'
import sophon03 from '../assets/works/sophon-03.jpg'
import mall01 from '../assets/works/vr-mall-01.jpg'
import mall02 from '../assets/works/vr-mall-02.jpg'
import mall03 from '../assets/works/vr-mall-03.jpg'
import sphere01 from '../assets/works/sphere-lab-01.jpg'
import sphere02 from '../assets/works/sphere-lab-02.jpg'
import sphere03 from '../assets/works/sphere-lab-03.jpg'

export type Control = { key: string; text: string }

export type Work = {
  slug: string
  title: string
  subtitle: string
  year: string // TODO: 確認年份
  category: string
  media: string[]
  roles: string[]
  award?: string
  team?: string // TODO: 團隊人數與期間
  video?: string
  summary: string
  concept: string
  controls: Control[]
  cover: string
  gallery: string[]
}

/**
 * 四件作品。文字取自原 PDF；圖片目前是 PDF 內壓縮版，等高解析原圖到位後替換 src/assets/works/。
 */
export const works: Work[] = [
  {
    slug: 'explorer',
    title: 'Explorer',
    subtitle: '大四畢業專題 · VR 跑酷遊戲',
    year: '2024',
    category: '大四畢業專題',
    media: ['Unity-VR', 'Oculus 2'],
    roles: ['劇情企劃', '關卡設計', '程式設計'],
    award: '金點新秀設計獎 · 數位互動設計類',
    video: 'https://www.youtube.com/watch?v=88uHfCe4Nuw',
    summary: '用揮臂取代搖桿的 VR 跑酷，吸取能力改變路徑。',
    concept: '希望透過不同的 VR 移動方式，創造全新的跑酷體驗，搭配吸取能力效果配合關卡過關。',
    controls: [
      { key: 'Swing', text: '透過揮動 VR 手把進行移動' },
      { key: 'A', text: '按下右手的 A 鍵吸取能力' },
      { key: 'Trigger', text: '手把前方的 Trigger 按鈕使用能力' },
    ],
    cover: explorer01,
    gallery: [explorer02, explorer03],
  },
  {
    slug: 'sophon-wave',
    title: 'Sophon · Wave',
    subtitle: '智子 · VR 奇幻旅程',
    year: '2024',
    category: 'VR 體驗',
    media: ['Unity-VR', 'Unity-Android', 'Oculus 2'],
    roles: ['劇情企劃', '關卡設計', '程式設計'],
    video: 'https://youtube.com/shorts/yQsaaxFfB3g',
    summary: '與小精靈的 VR 奇幻旅程，以繩索移動與射出手觸發機關。',
    concept: '與小精靈的奇幻旅程，透過 VR 給人全方位的沉浸體驗。',
    controls: [
      { key: 'Rope', text: '主要透過繩索的方式來移動' },
      { key: 'A', text: 'A 鍵射出手來觸發各種機關' },
      { key: '—', text: '透過最直觀且簡單的操作來探索' },
    ],
    cover: sophon01,
    gallery: [sophon02, sophon03],
  },
  {
    slug: 'vr-mall',
    title: 'VR 虛擬商城',
    subtitle: '有日互動 · 企業 VR 展示',
    year: '2023',
    category: '有日互動',
    media: ['Unity-VR', 'Oculus 2'],
    roles: ['程式設計'],
    video: 'https://www.youtube.com/watch?v=BBR6fNQ4QRA',
    summary: '協助企業在 VR 中展示產品，並與後端合作蒐集使用者數據。',
    concept: '透過 VR 商城來協助公司展示自己的產品，並與後端合作蒐集使用者數據。',
    controls: [
      { key: 'Stick', text: '蘑菇頭移動' },
      { key: 'Grab', text: 'Grab 鍵抓取物品' },
      { key: 'Trigger', text: 'Trigger 按鍵觸發各種功能' },
    ],
    cover: mall01,
    gallery: [mall02, mall03],
  },
  {
    slug: 'sphere-lab',
    title: '球體實驗室',
    subtitle: '大二上學期專題 · 手機遠端互動裝置',
    year: '2022',
    category: '大二上學期專題',
    media: ['Unity-Android', 'Unity-PC', 'ExtOSC'],
    roles: ['劇情企劃', '場景設計', '程式設計'],
    video: 'https://www.youtube.com/watch?v=h8n11s8I7i8',
    summary: '用手機遠端賦予球體顏色與聲音，製造屬於自己的球。',
    concept: '這是製作球體生命的秘密實驗室，研究如何讓球體有生命跡象。',
    controls: [
      { key: 'Phone', text: '透過手機遠端賦予球體顏色以及撞擊後的聲音' },
      { key: 'Throw', text: '投擲後製造出屬於自己的球' },
    ],
    cover: sphere01,
    gallery: [sphere02, sphere03],
  },
]

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug)
}

export function getAdjacent(slug: string): { prev?: Work; next?: Work } {
  const i = works.findIndex((w) => w.slug === slug)
  if (i === -1) return {}
  return { prev: works[i - 1], next: works[i + 1] }
}
