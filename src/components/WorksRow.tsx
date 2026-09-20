import { Link } from '@tanstack/react-router'
import { useRef, type KeyboardEvent } from 'react'
import type { Work } from '../data/works'

/**
 * 橫向滑頁的作品列。滑鼠拖曳 / 觸控板橫滑 / 鍵盤 ← → 皆可切換。
 * 沒有卡片邊框與底色，圓角圖片本身就是卡片。
 */
export function WorksRow({ works }: { works: Work[] }) {
  const track = useRef<HTMLDivElement>(null)

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 28 : el.clientWidth * 0.5
    el.scrollBy({ left: e.key === 'ArrowRight' ? step : -step, behavior: 'smooth' })
    e.preventDefault()
  }

  return (
    <div
      ref={track}
      role="list"
      aria-label="作品列表，可用左右方向鍵切換"
      tabIndex={0}
      onKeyDown={onKey}
      className="no-scrollbar grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-4 overflow-x-auto px-5 pb-2 md:auto-cols-[min(440px,40%)] md:gap-7 md:px-12"
    >
      {works.map((w) => (
        <Link
          key={w.slug}
          to="/works/$slug"
          params={{ slug: w.slug }}
          role="listitem"
          data-card
          className="group grid snap-start content-start gap-3.5 outline-none"
        >
          <img
            src={w.cover}
            alt={`${w.title} 主視覺`}
            loading="lazy"
            width={1280}
            height={800}
            className="aspect-[16/10] w-full rounded-m object-cover outline-[1.5px] outline-offset-[3px] outline-transparent transition-[outline-color] duration-150 group-hover:outline-hair-2 group-focus-visible:outline-accent"
          />
          <div className="flex items-baseline justify-between font-sans text-[19px] font-bold tracking-tight">
            <span>{w.title}</span>
            <span className="font-mono text-[12px] font-normal text-t3">{w.year}</span>
          </div>
          <p className="m-0 text-[14px] leading-[1.75] text-t2">{w.summary}</p>
          <p className="m-0 font-mono text-[12px] text-t3">
            {w.media.join(' · ')}
            {w.award && (
              <>
                {' · '}
                <em className="not-italic text-accent">{w.award.split(' · ')[0]}</em>
              </>
            )}
          </p>
        </Link>
      ))}
    </div>
  )
}
