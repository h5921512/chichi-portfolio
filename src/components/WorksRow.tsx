import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Work } from '../data/works'
import { imageVariants } from '../data/imageVariants'

/**
 * 自動循環的作品列，hover 暫停。滑鼠拖曳 / 觸控板橫滑 / 鍵盤 ← → 皆可切換。
 * 沒有卡片邊框與底色，圓角圖片本身就是卡片。
 */
export function WorksRow({ works }: { works: Work[] }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null)
  const dragged = useRef(false)
  const interacting = useRef(false)
  const hovered = useRef(false)
  const resumeAt = useRef(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = track.current
    if (!el || paused || works.length < 2) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let previous = 0
    let position = el.scrollLeft
    function advance(now: number) {
      if (!el) return
      const elapsed = previous ? Math.min(now - previous, 50) : 0
      previous = now
      if (reducedMotion.matches || document.hidden || hovered.current ||
        el.querySelector(':focus-visible') || el.matches(':focus-visible') ||
        interacting.current || drag.current || now < resumeAt.current) {
        position = el.scrollLeft
      } else {
        const first = el.children[0] as HTMLElement
        const repeat = el.children[works.length] as HTMLElement
        const width = repeat.offsetLeft - first.offsetLeft
        if (width > 0) {
          position = (position + elapsed * 0.0455) % width
          el.scrollLeft = position
        }
      }
      frame = requestAnimationFrame(advance)
    }
    frame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frame)
  }, [paused, works.length])

  function finishDrag() {
    interacting.current = false
    resumeAt.current = performance.now() + 1200
    const el = track.current
    const current = drag.current
    if (!el || !current) return
    drag.current = null
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
    <section aria-label="作品輪播">
    <div className="flex justify-end px-5 pb-2 md:px-12">
      <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="min-h-11 px-2 text-[13px] text-t2 hover:text-accent">
        {paused ? '繼續自動捲動' : '暫停自動捲動'}
      </button>
    </div>
    <div
      ref={track}
      role="list"
      aria-label="作品列表，可用左右方向鍵切換"
      tabIndex={0}
      onKeyDown={onKey}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') hovered.current = true }}
      onPointerLeave={() => {
        hovered.current = false
        if (drag.current && !dragged.current) finishDrag()
      }}
      onWheel={() => { resumeAt.current = performance.now() + 1200 }}
      onPointerDown={(event) => {
        interacting.current = true
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
      className="no-scrollbar grid w-full min-w-0 cursor-grab scroll-px-5 auto-cols-[84%] grid-flow-col select-none gap-4 overflow-x-auto px-5 pb-2 md:auto-cols-[min(440px,40%)] md:gap-7 md:scroll-px-12 md:px-12"
    >
      {(works.length > 1 ? [...works, ...works] : works).map((w, index) => (
        <Link
          key={`${w.slug}-${index}`}
          to="/works/$slug"
          params={{ slug: w.slug }}
          role="listitem"
          aria-hidden={index >= works.length || undefined}
          tabIndex={index >= works.length ? -1 : undefined}
          data-card
          draggable={false}
          className="group grid content-start gap-3.5 outline-none"
        >
          <img
            src={imageVariants[w.cover].src}
            srcSet={imageVariants[w.cover].srcSet}
            sizes="(min-width: 768px) min(440px, 40vw), 84vw"
            decoding="async"
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
    </section>
  )
}
