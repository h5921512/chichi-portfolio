import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { SkillPills } from '../components/SkillPills'
import { Facts, PillLink, TextLink } from '../components/ui'
import { profile } from '../data/profile'
import portrait from '../assets/optimized/portrait.webp'

export const Route = createFileRoute('/')({
  component: About,
  head: () => ({ meta: [{ title: `${profile.nameEn} — ${profile.title}` }] }),
})

function About() {
  return (
    <main className="page-enter flex flex-1 flex-col lg:[&>footer]:mt-0">
      <div className="mx-auto grid w-full max-w-[1640px] gap-9 px-5 py-7 md:px-12 lg:my-auto lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-8 lg:py-3 min-[1600px]:gap-12 min-[1600px]:py-12">
        <section aria-labelledby="about-heading" className="min-w-0">
          <div className="flex items-center gap-5">
            <img
              src={portrait}
              alt={`${profile.nameZh}的個人照`}
              width={112}
              height={140}
              className="h-[90px] w-[72px] min-[1600px]:h-[140px] min-[1600px]:w-[112px] shrink-0 rounded-m object-cover object-top"
            />
            <div>
              <h1 id="about-heading" className="text-[28px] font-bold leading-tight tracking-tight xl:text-[32px] min-[1600px]:text-[40px]">{profile.nameZh}</h1>
              <p className="mt-1 font-sans text-[16px] text-t2">{profile.nameEn}</p>
              <p className="mt-2 font-sans text-[15px] font-semibold text-accent">{profile.title}</p>
            </div>
          </div>
          <p className="mt-4 text-[21px] min-[1600px]:mt-8 min-[1600px]:text-[28px] font-bold leading-relaxed">{profile.headlineZh}</p>
          <div className="mt-3 max-w-[34em] space-y-3 text-[16px] leading-[1.65] text-t2 min-[1600px]:mt-5 min-[1600px]:space-y-5 min-[1600px]:text-[18px] min-[1600px]:leading-[1.85]">
            {profile.bio.split('\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-4 [&_div]:py-1 min-[1600px]:mt-7 min-[1600px]:[&_div]:py-2.5 min-[1600px]:[&_dd]:text-[16px]">
            <Facts items={profile.facts.filter((fact) => fact.label !== 'Award')} labelWidth="w-[64px]" />
          </div>
          <div className="mt-4 flex flex-wrap min-[1600px]:mt-7 items-center gap-4">
            <PillLink to="/works">View works</PillLink>
            {profile.resumeHref && (
              <TextLink href={profile.resumeHref} download>Download résumé</TextLink>
            )}
          </div>
        </section>

        <div className="min-w-0 lg:border-l lg:border-hair lg:pl-8 min-[1600px]:pl-12">
          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="text-[20px] font-bold lg:leading-tight min-[1600px]:text-[26px] min-[1600px]:leading-[1.75]">技能 <span className="ml-2 font-sans text-[14px] font-normal text-t3">Skills</span></h2>
            <SkillPills />
          </section>
          <section aria-labelledby="experience-heading" className="mt-6 border-t border-hair pt-3 min-[1600px]:mt-8 min-[1600px]:pt-6">
            <h2 id="experience-heading" className="text-[20px] font-bold lg:leading-tight min-[1600px]:text-[26px] min-[1600px]:leading-[1.75]">經歷與學歷 <span className="ml-2 font-sans text-[14px] font-normal text-t3">Experience</span></h2>
            <Timeline items={profile.experience} />
          </section>
          <section aria-labelledby="awards-heading" className="mt-4 border-t border-hair pt-3 min-[1600px]:mt-8 min-[1600px]:pt-6">
            <h2 id="awards-heading" className="text-[20px] font-bold lg:leading-tight min-[1600px]:text-[26px] min-[1600px]:leading-[1.75]">獎項 <span className="ml-2 font-sans text-[14px] font-normal text-t3">Awards</span></h2>
            <Timeline items={profile.awards} />
          </section>
        </div>
      </div>
      <Footer next={{ to: '/works', label: 'Works' }} />
    </main>
  )
}

function Timeline({ items }: { items: ReadonlyArray<{ period: string; title: string; note?: string }> }) {
  return (
    <ul className="mt-2 grid list-none gap-2 p-0 lg:gap-1 min-[1600px]:mt-5 min-[1600px]:gap-6">
      {items.map((it) => (
        <li key={it.period + it.title} className="grid gap-0.5 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-4 min-[1600px]:grid-cols-[120px_minmax(0,1fr)] min-[1600px]:gap-6">
          <span className="pt-0.5 font-sans text-[14px] tabular-nums text-t3 min-[1600px]:text-[16px]">{it.period}</span>
          <div>
            <span className="block text-[16px] font-semibold text-t1 min-[1600px]:text-[20px]">{it.title}</span>
            {it.note && <span className="block whitespace-pre-line text-[16px] leading-relaxed text-t2 min-[1600px]:mt-1 min-[1600px]:text-[18px]">{it.note}</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}
