import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { profile } from '../data/profile'

type Props = {
  /** 右側的「下一頁」連結，例如 { to: '/works', label: 'Works' } */
  next?: { to: '/' | '/works' | '/contact'; label: string }
  right?: ReactNode
}

export function Footer({ next, right }: Props) {
  return (
    <footer className="mt-auto flex items-center justify-between border-t border-hair px-5 py-5 font-mono text-[12px] text-t3 md:px-12">
      <span>© {new Date().getFullYear()} {profile.nameEn}</span>
      {next ? (
        <Link
          to={next.to}
          className="text-t2 underline decoration-hair-2 underline-offset-4 transition-colors duration-150 hover:text-t1 hover:decoration-accent"
        >
          {next.label} →
        </Link>
      ) : (
        right
      )}
    </footer>
  )
}
