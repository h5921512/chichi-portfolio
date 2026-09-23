import { Link } from '@tanstack/react-router'
import { useRef, type KeyboardEvent } from 'react'
import type { Work } from '../data/works'

/**
 * 橫向滑頁的作品列。滑鼠拖曳 / 觸控板橫滑 / 鍵盤 ← → 皆可切換。
 * 沒有卡片邊框與底色，圓角圖片本身就是卡片。
 */
export function WorksRow({ works }: { works: Work[] }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null)
  const dragged = useRef(false)

  function finishDrag() {
    const el = track.current
    const current = drag.current
    if (!el || !current) return
    drag.current = null
    el.style.scrollSnapType = ''
    el.style.cursor = ''
    if (el.hasPointerCapture(current.pointerId)) el.releasePointerCapture(current.pointerId)
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap) : el.clientWidth * 0.5
    el.scrollBy({
      left: e.key === 'ArrowRight' ? step : -step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
    e.preventDefault()
  }

  return (
    <div
      ref={track}
      role="list"
      aria-label="作品列表，可用左右方向鍵切換"
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={(event) => {
        dragged.current = false
        if (event.pointerType !== 'mouse' || event.button !== 0) return
        drag.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
      }}
      onPointerMove={(event) => {
        const current = drag.current
        if (!current || event.pointerId !== current.pointerId) return
        const distance = event.clientX - current.startX
        if (!dragged.current && Math.abs(distance) < 6) return
        const el = event.currentTarget
        if (!dragged.current) {
          dragged.current = true
          el.setPointerCapture(event.pointerId)
          el.style.scrollSnapType = 'none'
          el.style.cursor = 'grabbing'
        }
        el.scrollLeft = current.scrollLeft - distance
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onLostPointerCapture={finishDrag}
      onClickCapture={(event) => {
        if (!dragged.current || event.detail === 0) return
        event.preventDefault()
        event.stopPropagation()
      }}
      className="no-scrollbar grid w-full min-w-0 cursor-grab snap-x snap-mandatory scroll-px-5 auto-cols-[84%] grid-flow-col select-none gap-4 overflow-x-auto px-5 pb-2 md:auto-cols-[min(440px,40%)] md:gap-7 md:scroll-px-12 md:px-12"
    >
      {works.map((w) => (
        <Link
          key={w.slug}
          to="/works/$slug"
          params={{ slug: w.slug }}
          role="listitem"
          data-card
          draggable={false}
          className="group grid snap-start content-start gap-3.5 outline-none"
        >
          <img
            src={w.cover}
            alt={`${w.title} 主視覺`}
            draggable={false}
            loading="lazy"
            width={1280}
            height={800}
            className="aspect-[16/10] w-full rounded-m object-cover outline-[1.5px] outline-offset-[3px] outline-transparent transition-[outline-color] duration-150 group-hover:outline-hair-2 group-focus-visible:outline-accent"
          />
          <div className="flex items-baseline justify-between gap-3 font-sans text-[19px] font-bold tracking-tight">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span>{w.title}</span>
              <span className="font-zh text-[13px] font-normal tracking-normal text-t2">{w.context}</span>
            </span>
            <span className="shrink-0 font-mono text-[12px] font-normal text-t3">{w.year}</span>
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
