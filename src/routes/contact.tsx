import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Footer } from '../components/Footer'
import { profile } from '../data/profile'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({ meta: [{ title: 'Contact — Chi Chi-Feng' }] }),
})

function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* 剪貼簿不可用時，使用者仍可直接點 mailto 連結 */
    }
  }

  const links = [
    ...profile.links,
    ...(profile.resumeHref ? [{ label: 'Résumé', value: 'PDF', href: profile.resumeHref, download: true }] : []),
  ]

  return (
    <main className="page-enter flex flex-1 flex-col">
      <div className="flex items-baseline justify-between px-5 pt-8 pb-4 md:px-12 md:pt-10 md:pb-[22px]">
        <h1 className="font-sans text-[30px] font-bold tracking-[-.03em] md:text-[36px]">
          Contact
          <span className="ml-3.5 font-zh text-[15px] font-normal tracking-normal text-t3">聯絡</span>
        </h1>
        <span className="font-mono text-[12px] text-t3">{profile.location}</span>
      </div>
      <section className="grid items-start gap-8 px-5 pt-2 pb-10 md:grid-cols-[1.1fr_.9fr] md:gap-16 md:px-12 md:pb-14">
        <div>
          <p className="m-0 max-w-[44ch] text-[15.5px] leading-[1.9] text-t2">{profile.contactLead}</p>

          <div className="mt-7 flex flex-wrap items-baseline gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-block font-sans text-[20px] font-medium tracking-[-.02em] text-t1 underline decoration-accent decoration-[1.5px] underline-offset-[8px] transition-colors hover:text-accent md:text-[26px]"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="font-sans text-[13px] text-t3 underline decoration-hair-2 underline-offset-4 transition-colors hover:text-t1"
              aria-live="polite"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="mt-3 text-[13px] text-t3">通常在 2 個工作日內回覆</p>
        </div>

        <ul className="m-0 list-none p-0">
          {links.map((l) => (
            <li key={l.label} className="border-t border-hair last:border-b">
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group grid grid-cols-[70px_1fr_auto] items-baseline gap-3.5 py-3.5 text-[14.5px] md:grid-cols-[100px_1fr_auto]"
              >
                <span className="font-mono text-[12px] text-t3">{l.label}</span>
                <span className="font-sans font-medium transition-colors group-hover:text-accent">{l.value}</span>
                <span className="text-t3">{'download' in l && l.download ? '↓' : '↗'}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  )
}
