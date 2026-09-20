import { Link } from '@tanstack/react-router'
import type { ComponentProps, ReactNode } from 'react'

const pill =
  'inline-flex items-center justify-center rounded-full bg-t1 px-[18px] py-[10px] font-sans text-[14px] font-semibold text-ground transition-[opacity,transform] duration-150 ease-[var(--ease-quint)] hover:opacity-90 active:scale-[0.98]'

/** 實心藥丸按鈕：外部連結版 */
export function PillAnchor({ className = '', ...rest }: ComponentProps<'a'>) {
  return <a className={`${pill} ${className}`} {...rest} />
}

/** 實心藥丸按鈕：站內路由版 */
export function PillLink({ className = '', ...rest }: ComponentProps<typeof Link>) {
  return <Link className={`${pill} ${className}`} {...rest} />
}

/** 底線文字連結 */
export function TextLink({ className = '', ...rest }: ComponentProps<'a'>) {
  return (
    <a
      className={`font-sans text-[14px] text-t2 underline decoration-hair-2 underline-offset-4 transition-colors duration-150 hover:text-t1 hover:decoration-accent ${className}`}
      {...rest}
    />
  )
}

/** 髮絲線分隔的「標籤 / 值」列表 */
export function Facts({
  items,
  labelWidth = 'w-[90px]',
}: {
  items: ReadonlyArray<{ label: string; value: ReactNode; accent?: boolean }>
  labelWidth?: string
}) {
  return (
    <dl className="grid">
      {items.map((f) => (
        <div key={f.label} className="flex gap-3.5 border-t border-hair py-2.5 text-[14px]">
          <dt className={`${labelWidth} shrink-0 pt-0.5 font-mono text-[12px] text-t3`}>{f.label}</dt>
          <dd className={f.accent ? 'text-accent' : 'text-t1'}>{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** 小節標題：英文粗體 + 中文灰字 */
export function SectionTitle({ en, zh }: { en: string; zh?: string }) {
  return (
    <h4 className="mb-3.5 font-sans text-[14.5px] font-bold text-t1">
      {en}
      {zh && <span className="ml-2 font-zh text-[13px] font-normal text-t3">{zh}</span>}
    </h4>
  )
}
