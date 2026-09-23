import explorer01 from '../assets/works/explorer-01.jpg'
import explorer02 from '../assets/works/explorer-02.jpg'
import explorer03 from '../assets/works/explorer-03.jpg'
import sophon01 from '../assets/works/sophon-01.jpg'
import sophon02 from '../assets/works/sophon-02.jpg'
import sophon03 from '../assets/works/sophon-03.jpg'
import mall01 from '../assets/works/vr-mall-01.jpg'
import mall02 from '../assets/works/vr-mall-02.jpg'
import mall03 from '../assets/works/vr-mall-03.jpg'
import fire01 from '../assets/works/vr-fire-extinguisher-01.png'
import fire02 from '../assets/works/vr-fire-extinguisher-02.png'
import fire03 from '../assets/works/vr-fire-extinguisher-03.png'
import cpr01 from '../assets/works/vr-cpr-01.png'
import cpr02 from '../assets/works/vr-cpr-02.png'
import cpr03 from '../assets/works/vr-cpr-03.png'
import muze01 from '../assets/works/muzexr-01.png'
import muze02 from '../assets/works/muzexr-02.png'
import abcd01 from '../assets/works/abcd-01.png'
import abcd02 from '../assets/works/abcd-02.png'
import abcd03 from '../assets/works/abcd-03.png'
import abcd04 from '../assets/works/abcd-04.png'
import sphere01 from '../assets/works/sphere-lab-poster.png'
import sphereColor from '../assets/works/sphere-lab-color.jpg'

export type Control = { key: string; text: string }

export type Work = {
  slug: string
  title: string
  subtitle: string
  year: string // TODO: 確認年份
  category: string
  context: string
  media: string[]
  roles: string[]
  award?: string
  team?: string // TODO: 團隊人數與期間
  video?: string
  videos?: { title: string; url: string }[]
  mobileVideo?: string
  website?: string
  store?: string
  summary: string
  concept: string
  controls?: Control[]
  controlGroups?: { title: string; controls: Control[] }[]
  cover: string
  gallery: string[]
}

/**
 * 作品資料；圖片包含原 PDF 擷取圖與補充原圖。
 */
export const works: Work[] = [
  {
    slug: 'abcd',
    title: 'ABCD',
    subtitle: 'A Black Climbing Dog · Team9 合作專案',
    year: '2026',
    category: 'Team9 合作專案',
    context: 'Team9',
    media: ['Unity-VR', 'Meta Quest 3'],
    roles: ['程式設計', '關卡協作'],
    team: '5 人 · 8 個月',
    videos: [
      { title: '作品影片', url: 'https://www.youtube.com/watch?v=AOQkaZMTApg' },
      { title: '直式短片', url: 'https://youtube.com/shorts/Xvo_XIz8l-A' },
    ],
    store: 'https://www.meta.com/zh-tw/experiences/a-black-climbing-dog/25381527218177734/',
    summary: '扮演尋找主人的黑狗，以揮臂跳躍與叫聲衝刺攀上高塔，沿途收集紀念品，重拾與主人的回憶。',
    concept: '與 Team9 合作的《A Black Climbing Dog》（ABCD），讓玩家扮演一隻為了尋找主人而攀上高塔的黑狗。遊戲採用類似《Gorilla Tag》的手臂移動與跳躍方式，結合叫聲累積能量後的衝刺能力，沿途收集紀念品，回憶與主人相處的時光。',
    controls: [
      { key: 'Swing', text: '揮動雙手來移動與跳躍' },
      { key: 'Grab', text: '按下 Grab 鍵收集紀念品' },
      { key: 'Bark', text: '透過叫聲累積衝刺條' },
      { key: 'Trigger', text: '累積衝刺條後，按下 Trigger 進行衝刺' },
      { key: 'Left Stick', text: '開啟手錶，使用背包、降落傘及護目鏡等道具' },
    ],
    cover: abcd01,
    gallery: [abcd02, abcd03, abcd04],
  },
  {
    slug: 'explorer',
    title: 'Explorer',
    subtitle: '大四畢業專題 · VR 跑酷遊戲',
    year: '2024',
    category: '大四畢業專題',
    context: '大四畢製',
    media: ['Unity-VR', 'Oculus 2'],
    roles: ['劇情企劃', '關卡設計', '程式設計'],
    award: '金點新秀設計獎 · 數位互動設計類',
    team: '5 人 · 12 個月',
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
    title: 'Wave',
    subtitle: '智子 · VR 奇幻旅程',
    year: '2025',
    category: 'VR 體驗',
    context: 'Sophon',
    media: ['Unity-VR', 'Unity-Android', 'Oculus 2'],
    roles: ['劇情企劃', '關卡設計', '程式設計'],
    team: '6 人 · 18 個月',
    mobileVideo: 'https://youtube.com/shorts/yQsaaxFfB3g',
    videos: [
      { title: 'Demo 影片', url: 'https://youtu.be/5y-YQQSnaxk' },
      { title: '實際遊玩影片', url: 'https://youtu.be/vvLjADTLnjc' },
    ],
    summary: '與小精靈的 VR 奇幻旅程，以繩索移動與射出手觸發機關。',
    concept: '與小精靈的奇幻旅程，透過 VR 給人全方位的沉浸體驗。',
    controlGroups: [
      {
        title: 'VR 操作',
        controls: [
          { key: 'Grab', text: '按下 Grab 鍵拿取各種物品' },
          { key: '背包', text: '將手舉到頭上，按下 Grab 鍵開啟背包' },
          { key: 'Trigger', text: '按下 Trigger 鍵使用繩索移動' },
        ],
      },
      {
        title: '手機版操作',
        controls: [
          { key: '側邊 UI', text: '透過側邊 UI 開啟各種功能' },
          { key: '點擊螢幕', text: '點擊螢幕使用繩索移動' },
        ],
      },
    ],
    cover: sophon01,
    gallery: [sophon02, sophon03],
  },
  {
    slug: 'muzexr',
    title: 'Muze XR',
    subtitle: '外包協作 · WebGL 與 VR 空間布置',
    year: '2025',
    category: '外包協作',
    context: 'Muze XR · 外包協作',
    media: ['Unity-WebGL', 'Unity-VR', 'Sketchfab'],
    roles: ['程式設計', 'WebGL 版本移植', 'VR 功能開發'],
    video: 'https://www.youtube.com/watch?v=Dn4jqKaJ1Bk',
    website: 'https://muzexr.com/',
    summary: '外包協助 WebGL 版本移植，以及 WebGL 與 VR 的空間布置、圖片上傳與 Sketchfab 模型動態匯入功能。',
    concept: '以外包協作方式參與 Muze XR 的部分功能開發，主要負責 WebGL 版本移植，讓使用者能在瀏覽器中自由布置自己的空間、上傳圖片，並動態匯入 Sketchfab 模型，同時協助 VR 版的相關功能。',
    controlGroups: [
      {
        title: 'WebGL 操作',
        controls: [
          { key: 'Left Click', text: '點擊進行操作' },
          { key: 'Scroll Wheel', text: '將物品放大或縮小' },
          { key: 'WASD / Mouse', text: '搭配 WASD 與滑鼠操控第三人稱視角' },
        ],
      },
      {
        title: 'VR 操作',
        controls: [
          { key: 'Left Stick', text: '控制人物移動' },
          { key: 'Trigger', text: '按下左手 Trigger 進行傳送移動' },
          { key: 'Grab', text: '拿起物品' },
          { key: 'Ray', text: '透過 Ray Interactor 射線操控 UI' },
        ],
      },
    ],
    cover: muze01,
    gallery: [muze02],
  },
  {
    slug: 'vr-mall',
    title: 'VR 虛擬商城',
    subtitle: '有日互動 · 企業 VR 展示',
    year: '2023',
    category: '有日互動',
    context: '有日互動',
    media: ['Unity-VR', 'Oculus 2'],
    roles: ['程式設計'],
    video: 'https://www.youtube.com/watch?v=BBR6fNQ4QRA',
    team: '約 4 人 · 約 6 個月',
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
    slug: 'vr-fire-extinguisher',
    title: 'VR 滅火器',
    subtitle: '有日互動 · VR 消防教育體驗',
    year: '2023',
    category: '有日互動',
    context: '有日互動',
    media: ['Unity-VR', 'HTC Focus 3', 'ESP32', '實體小型滅火器'],
    roles: ['程式設計', '關卡製作'],
    team: '3 人 · 3 個月',
    video: 'https://www.youtube.com/watch?v=FDy2ktpfNNE',
    summary: '透過實際走動與實體滅火器，在 VR 中認識火災成因並學習滅火器操作。',
    concept: '透過 VR 世界讓小朋友學習如何使用滅火器，並認識哪些狀況可能引起火災。全程不使用搖桿，由玩家親自在場地內走動，搭配實體小型滅火器進行互動滅火。',
    controls: [
      { key: 'Walk', text: '玩家自行在場地內走路，於 VR 場景中移動' },
      { key: 'Pressed', text: '按壓實體滅火器，在 VR 中噴射水柱滅火' },
    ],
    cover: fire01,
    gallery: [fire02, fire03],
  },
  {
    slug: 'vr-cpr',
    title: 'VR CPR',
    subtitle: '有日互動 · VR 急救教育體驗',
    year: '2023',
    category: '有日互動',
    context: '有日互動',
    media: ['Unity-VR', 'HTC Focus 3', 'HTC Tracker', '實體安妮 CPR 假人'],
    roles: ['程式設計', '關卡製作'],
    team: '3 人 · 3 個月',
    video: 'https://www.youtube.com/watch?v=gWpZxSCHYuI',
    summary: '結合手部追蹤與實體安妮 CPR 假人，在 VR 中學習 CPR 與 AED 操作。',
    concept: '透過 VR 世界讓小朋友認識遇到緊急狀況時的處理方式，涵蓋 CPR 與 AED 操作。全程不使用搖桿，透過 HTC 手部 Tracker 偵測玩家雙手是否重疊，並依據追蹤數值判斷 CPR 姿勢是否標準，搭配實體安妮 CPR 假人進行互動。',
    controls: [
      { key: 'Walk', text: '玩家自行在場館內走路，於 VR 場景中移動' },
      { key: 'Hands', text: '直接以雙手進行操作，透過手部追蹤與實體安妮 CPR 假人互動' },
    ],
    cover: cpr01,
    gallery: [cpr02, cpr03],
  },
  {
    slug: 'sphere-lab',
    title: '球體實驗室',
    subtitle: '大二上學期專題 · 手機遠端互動裝置',
    year: '2022',
    category: '大二上學期專題',
    context: '大二',
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
    gallery: [sphereColor],
  },
]

works.sort((a, b) => Number(b.year) - Number(a.year))

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug)
}

export function getAdjacent(slug: string): { prev?: Work; next?: Work } {
  const i = works.findIndex((w) => w.slug === slug)
  if (i === -1) return {}
  return { prev: works[i - 1], next: works[i + 1] }
}
