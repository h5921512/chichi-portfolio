import { useEffect, useRef, useState } from 'react'
import { imageVariants } from '../data/imageVariants'

export function WorkGallery({ title, images, portrait = false }: { title: string; images: string[]; portrait?: boolean }) {
  const track = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null)
  const dragged = useRef(false)
  const [selected, setSelected] = useState(0)
  const [opened, setOpened] = useState(false)
  const [expanded, setExpanded] = useState(0)

  useEffect(() => {
    if (!opened) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [opened])

  function select(index: number) {
    const el = track.current
    const card = el?.children[index] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({
      left: card.offsetLeft - el.clientWidth / 2 + card.offsetWidth / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  function syncSelection() {
    const el = track.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    const distances = Array.from(el.children, (child) => {
      const card = child as HTMLElement
      return Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
    })
    const index = distances.indexOf(Math.min(...distances))
    setSelected(index)
    return index
  }

  function finishDrag() {
    const el = track.current
    const current = drag.current
    if (!el || !current) return
    drag.current = null
    if (dragged.current) {
      const index = syncSelection()
      el.style.scrollSnapType = ''
      el.style.cursor = ''
      if (index !== undefined) select(index)
    }
    if (el.hasPointerCapture(current.pointerId)) el.releasePointerCapture(current.pointerId)
  }

  function close() {
    dialog.current?.close()
  }

  return (
    <section aria-label="實機遊玩圖片" className="min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-medium">實機遊玩圖片</h2>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="上一張圖片" disabled={selected === 0} onClick={() => select(selected - 1)} className="h-11 w-11 rounded-full border border-hair hover:bg-s2 disabled:opacity-30">←</button>
          <span className="text-[13px] text-t2" aria-live="polite">{selected + 1} / {images.length}</span>
          <button type="button" aria-label="下一張圖片" disabled={selected === images.length - 1} onClick={() => select(selected + 1)} className="h-11 w-11 rounded-full border border-hair hover:bg-s2 disabled:opacity-30">→</button>
        </div>
      </div>
      <div
        ref={track}
        data-scroll-restoration-id={`gallery-${title}`}
        onScroll={syncSelection}
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
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          select(Math.max(0, Math.min(images.length - 1, selected + (event.key === 'ArrowRight' ? 1 : -1))))
        }}
        className="no-scrollbar relative flex cursor-grab snap-x snap-mandatory select-none gap-3 overflow-x-auto px-[9%] py-3 md:gap-5 md:px-[14%]"
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`放大${title}圖片 ${index + 1}`}
            aria-current={selected === index ? 'true' : undefined}
            onClick={() => {
              select(index)
              setExpanded(index)
              setOpened(true)
              dialog.current?.showModal()
            }}
            className={`w-full shrink-0 snap-center rounded-m transition-[scale,opacity] duration-300 motion-reduce:transition-none ${selected === index ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}`}
          >
            <img src={imageVariants[src].src} srcSet={imageVariants[src].srcSet} sizes={portrait ? '(min-width: 768px) 360px, 82vw' : '(min-width: 768px) calc((100vw - 432px) * 0.72), 82vw'} decoding="async" alt={`${title} 實機畫面 ${index + 1}`} draggable={false} loading="lazy" width={portrait ? 720 : 1280} height={portrait ? 1280 : 720} className={portrait ? 'mx-auto aspect-[9/16] w-full max-w-[360px] rounded-m bg-s2 object-contain' : 'aspect-video w-full rounded-m bg-s2 object-contain'} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[13px] text-t3">左右滑動瀏覽，點擊圖片放大</p>
      <dialog
        ref={dialog}
        aria-label={`${title} 圖片放大檢視`}
        onClose={() => {
          setOpened(false)
          select(expanded)
          const selectedImage = track.current?.children[expanded] as HTMLElement | undefined
          selectedImage?.focus({ preventScroll: true })
        }}
        onClick={(event) => { if (event.target === event.currentTarget) close() }}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          setExpanded((index) => Math.max(0, Math.min(images.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1))))
        }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black/95 p-4 text-white backdrop:bg-black/80 md:p-8"
      >
        {opened && (
          <div className="pointer-events-none flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p aria-live="polite">{title} · {expanded + 1} / {images.length}</p>
              <button type="button" autoFocus onClick={close} className="pointer-events-auto min-h-11 rounded-full border border-white/40 px-5">關閉 ×</button>
            </div>
            <img src={images[expanded]} alt={`${title} 實機畫面 ${expanded + 1}，完整圖片`} className="pointer-events-auto min-h-0 w-full flex-1 object-contain" />
            <div className="flex justify-center gap-6">
              <button type="button" aria-label="放大檢視：上一張" disabled={expanded === 0} onClick={() => setExpanded(expanded - 1)} className="pointer-events-auto min-h-11 rounded-full border border-white/40 px-5 disabled:opacity-30">← 上一張</button>
              <button type="button" aria-label="放大檢視：下一張" disabled={expanded === images.length - 1} onClick={() => setExpanded(expanded + 1)} className="pointer-events-auto min-h-11 rounded-full border border-white/40 px-5 disabled:opacity-30">下一張 →</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
