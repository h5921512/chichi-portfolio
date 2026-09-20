import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Facts, PillLink, SectionTitle, TextLink } from '../components/ui'
import { profile } from '../data/profile'

export const Route = createFileRoute('/')({
  component: About,
  head: () => ({ meta: [{ title: `${profile.nameEn} — ${profile.title}` }] }),
})

function About() {
  return (
    <main className="page-enter flex flex-1 flex-col">
      <section className="grid items-start gap-8 px-5 pt-9 pb-8 md:grid-cols-[1.25fr_.75fr] md:gap-14 md:px-12 md:pt-14 md:pb-10">
        <div>
          <p className="font-mono text-[12.5px] tracking-[.04em] text-t3">{profile.eyebrow}</p>
          <h1 className="mt-4 font-sans text-[36px] font-bold leading-[1.02] tracking-[-.03em] md:mt-[18px] md:text-[56px]">
            {profile.headlineEn}
            <span className="mt-3 block font-zh text-[23px] font-bold leading-[1.3] tracking-normal md:text-[34px]">
              {profile.headlineZh}
            </span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.9] text-t2">{profile.bio}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <PillLink to="/works">View works</PillLink>
            {profile.resumeHref ? (
              <TextLink href={profile.resumeHref} download>
                Download résumé
              </TextLink>
            ) : (
              <span className="font-sans text-[14px] text-t3">Résumé — coming soon</span>
            )}
          </div>
        </div>

        <div>
          {/* TODO: 個人照 4:5，放到 src/assets/portrait.jpg 後改為 <img> */}
          <div
            aria-hidden="true"
            className="grid aspect-[16/10] place-items-center rounded-m bg-s2 font-mono text-[11.5px] tracking-[.04em] text-t3 md:aspect-[4/5]"
          >
            Portrait · 4 : 5
          </div>
          <div className="mt-5">
            <Facts items={profile.facts} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 px-5 pt-4 pb-10 md:grid-cols-3 md:gap-12 md:px-12 md:pb-14">
        <div className="border-t border-hair pt-[18px]">
          <SectionTitle en="Skills" zh="技能" />
          <p className="m-0 text-[14px] leading-[1.9] text-t2">{profile.skills.join('、')}</p>
        </div>
        <div className="border-t border-hair pt-[18px]">
          <SectionTitle en="Experience" zh="經歷" />
          <Timeline items={profile.experience} />
        </div>
        <div className="border-t border-hair pt-[18px]">
          <SectionTitle en="Awards" zh="獎項" />
          <Timeline items={profile.awards} />
        </div>
      </section>

      <Footer next={{ to: '/works', label: 'Works' }} />
    </main>
  )
}

function Timeline({ items }: { items: ReadonlyArray<{ period: string; title: string; note?: string }> }) {
  return (
    <ul className="m-0 grid list-none p-0">
      {items.map((it) => (
        <li key={it.period + it.title} className="grid grid-cols-[78px_1fr] gap-3 py-[7px] text-[14px]">
          <span className="pt-[3px] font-mono text-[12px] text-t3">{it.period}</span>
          <div>
            <span className="block font-medium text-t1">{it.title}</span>
            {it.note && <span className="text-[12.5px] text-t3">{it.note}</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}
