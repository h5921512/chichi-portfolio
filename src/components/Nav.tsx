import { Link } from '@tanstack/react-router'
import { profile } from '../data/profile'

const items = [
  { to: '/', label: 'About', exact: true },
  { to: '/works', label: 'Works', exact: false },
  { to: '/contact', label: 'Contact', exact: true },
] as const

export function Nav() {
  return (
    <header className="flex h-16 items-center justify-between px-5 md:px-12">
      <Link to="/" className="font-sans text-[15px] font-bold tracking-tight text-t1">
        {profile.nameEn}
        <span className="ml-2.5 hidden font-zh text-[13px] font-normal text-t3 sm:inline">
          {profile.nameZh}
        </span>
      </Link>
      <nav aria-label="主選單">
        <ul className="flex gap-5 font-sans text-[15px] font-bold tracking-tight md:gap-8">
          {items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                activeOptions={{ exact: it.exact }}
                className="inline-block border-b-2 border-transparent py-1 text-t2 transition-colors duration-150 hover:text-t1"
                activeProps={{ className: 'border-accent! text-t1!' }}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
