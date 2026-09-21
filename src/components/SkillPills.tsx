import { useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/profile'

type Drag = {
  skill: string
  pointerId: number
  startX: number
  startY: number
  bounds: DOMRect
  origin: DOMRect
  target: number
  moved: boolean
}

export function SkillPills() {
  const [skills, setSkills] = useState<string[]>([...profile.skills])
  const [selected, setSelected] = useState<string | null>(null)
  const [visual, setVisual] = useState<{ skill: string; x: number; y: number; width: number; height: number; target: number } | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const area = useRef<HTMLUListElement>(null)
  const drag = useRef<Drag | null>(null)
  const suppressClick = useRef(false)
  const previousLayout = useRef<Map<HTMLElement, DOMRect> | null>(null)
  const preview = [...skills]
  if (visual) {
    preview.splice(preview.indexOf(visual.skill), 1)
    preview.splice(visual.target, 0, visual.skill)
  }

  function rememberLayout() {
    previousLayout.current = new Map(
      [...area.current!.children].map((element) => {
        const slot = element as HTMLElement
        const floating = slot.hasAttribute('data-placeholder')
          ? document.querySelector('.skill-floating') : null
        return [slot, (floating ?? slot).getBoundingClientRect()]
      }),
    )
  }

  useLayoutEffect(() => {
    const before = previousLayout.current
    if (!before) return
    previousLayout.current = null
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    for (const [slot, first] of before) {
      // Sample the visible position before reflow, then replace any interrupted
      // animation so rapid dragging continues smoothly from its current frame.
      slot.getAnimations().forEach((animation) => animation.cancel())
      if (reducedMotion || slot.hasAttribute('data-placeholder')) continue
      const last = slot.getBoundingClientRect()
      const x = first.left - last.left
      const y = first.top - last.top
      if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5) continue
      slot.animate([
        { transform: `translate(${x}px, ${y}px)` },
        { transform: 'translate(0, 0)' },
      ], { duration: 180, easing: 'cubic-bezier(0.42, 0, 0.7, 1)' })
    }
  })

  function move(skill: string, target: number) {
    const from = skills.indexOf(skill)
    if (target < 0 || target >= skills.length || target === from) return
    const next = [...skills]
    next.splice(from, 1)
    next.splice(target, 0, skill)
    rememberLayout()
    setSkills(next)
    setAnnouncement(`${skill} 已移至第 ${target + 1} 個位置，共 ${skills.length} 項。`)
  }

  function start(event: PointerEvent<HTMLButtonElement>, skill: string) {
    if (event.button !== 0 || !event.isPrimary || drag.current || !area.current) return
    suppressClick.current = false
    drag.current = {
      skill, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY,
      bounds: area.current.getBoundingClientRect(),
      origin: event.currentTarget.getBoundingClientRect(),
      target: skills.indexOf(skill), moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function track(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current
    if (!active || active.pointerId !== event.pointerId) return
    const dx = event.clientX - active.startX
    const dy = event.clientY - active.startY
    if (!active.moved && Math.hypot(dx, dy) < 6) return
    active.moved = true
    const { bounds, origin } = active
    const x = Math.max(bounds.left - origin.left, Math.min(bounds.right - origin.right, dx))
    const y = Math.max(bounds.top - origin.top, Math.min(bounds.bottom - origin.bottom, dy))
    const previousTarget = active.target
    const areaRect = area.current!.getBoundingClientRect()
    // Hit-test final layout positions, not the animated frames passing under
    // the pointer, to keep the insertion target stable while pills slide.
    for (const slot of area.current?.children ?? []) {
      const element = slot as HTMLElement
      const left = areaRect.left + element.offsetLeft
      const top = areaRect.top + element.offsetTop
      if (event.clientX >= left && event.clientX <= left + element.offsetWidth &&
          event.clientY >= top && event.clientY <= top + element.offsetHeight) {
        active.target = Number(element.style.order)
        break
      }
    }
    if (active.target !== previousTarget) rememberLayout()
    setVisual({ skill: active.skill, x: origin.left + x, y: origin.top + y,
      width: origin.width, height: origin.height, target: active.target })
  }

  function finish(event: PointerEvent<HTMLButtonElement>, cancel = false) {
    const active = drag.current
    if (!active || active.pointerId !== event.pointerId) return
    rememberLayout()
    drag.current = null
    suppressClick.current = active.moved || cancel
    if (active.moved && !cancel) { move(active.skill, active.target); setSelected(null) }
    setVisual(null)
  }

  return (
    <>
      <p id="skill-help" className="mt-1 text-[12px] text-t3 min-[1600px]:text-[14px]">
        拖曳排列，或點選技能再點選目標位置。
        <span className="sr-only">鍵盤可用左右方向鍵移動技能，Escape 取消操作。</span>
      </p>
      <ul ref={area} className="skill-pills" aria-label="可排序的技能">
        {skills.map((skill, index) => (
          <li key={skill} className="skill-slot" style={{ order: preview.indexOf(skill) }} data-placeholder={visual?.skill === skill || undefined}>
            <button
              type="button"
              className="skill-pill"
              aria-describedby="skill-help"
              aria-pressed={selected === skill}
              onPointerDown={(event) => start(event, skill)}
              onPointerMove={track}
              onPointerUp={(event) => finish(event)}
              onPointerCancel={(event) => finish(event, true)}
              onLostPointerCapture={(event) => finish(event, true)}
              onClick={() => {
                if (suppressClick.current) { suppressClick.current = false; return }
                if (selected) { move(selected, index); setSelected(null) }
                else setSelected(skill)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  rememberLayout()
                  drag.current = null; setVisual(null); setSelected(null); suppressClick.current = true
                }
                if (!drag.current && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                  event.preventDefault()
                  move(skill, index + (event.key === 'ArrowLeft' ? -1 : 1))
                  setSelected(null)
                }
                if (event.key === 'Enter' || event.key === ' ') suppressClick.current = false
              }}
            >{skill}</button>
          </li>
        ))}
      </ul>
      {visual && createPortal(
        <div className="skill-pill skill-floating" aria-hidden="true"
          style={{ left: visual.x, top: visual.y, width: visual.width, height: visual.height }}>
          {visual.skill}
        </div>, document.body,
      )}
      <span className="sr-only" role="status">{announcement}</span>
    </>
  )
}
