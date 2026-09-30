import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-2 border-t border-hair px-5 py-4 font-mono text-[12px] text-t3 sm:flex-row sm:items-center sm:justify-between md:px-12">
      <span>© {new Date().getFullYear()} {profile.nameEn}</span>
      <nav aria-label="聯絡方式" className="flex flex-wrap items-center gap-x-6 font-sans text-[14px] text-t2">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-11 items-center underline decoration-hair-2 underline-offset-4 transition-colors duration-150 hover:text-accent"
        >
          {profile.email}
        </a>
        {profile.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 underline decoration-hair-2 underline-offset-4 transition-colors duration-150 hover:text-accent"
          >
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </footer>
  )
}
