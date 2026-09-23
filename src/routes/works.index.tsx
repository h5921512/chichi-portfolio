import { Link, createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { WorksRow } from '../components/WorksRow'
import { works } from '../data/works'

export const Route = createFileRoute('/works/')({
  component: Works,
  head: () => ({ meta: [{ title: 'Works — Chi Chi-Feng' }] }),
})

function Works() {
  const years = works.map((w) => Number(w.year))
  const range = `${Math.min(...years)}–${Math.max(...years)}`

  return (
    <main className="page-enter flex flex-1 flex-col">
      <div className="flex items-baseline justify-between px-5 pt-8 pb-4 md:px-12 md:pt-10 md:pb-[22px]">
        <h1 className="font-sans text-[30px] font-bold tracking-[-.03em] md:text-[36px]">
          Works
          <span className="ml-3.5 font-zh text-[15px] font-normal tracking-normal text-t3">作品</span>
        </h1>
        <span className="font-mono text-[12px] text-t3">
          {works.length} projects · {range}
        </span>
      </div>

      <WorksRow works={works} />

      <section aria-label="作品索引" className="mx-5 mt-8 md:mx-12 md:mt-10">
        <div aria-hidden="true" className="grid grid-cols-[40px_minmax(0,1fr)_80px] gap-3 border-b border-hair-2 pb-2 text-[11px] text-t3 lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)_140px] lg:gap-6 lg:text-[12px]">
          <span>年份</span>
          <span>作品</span>
          <span className="hidden lg:block">製作媒介</span>
          <span>公司／學習階段</span>
        </div>
        <ol className="m-0 list-none p-0">
          {works.map((w) => (
            <li key={w.slug} className="border-b border-hair">
              <Link
                to="/works/$slug"
                params={{ slug: w.slug }}
                className="group grid min-h-11 grid-cols-[40px_minmax(0,1fr)_80px] items-center gap-x-3 gap-y-1 py-2.5 text-[14px] transition-colors duration-150 hover:bg-s1 lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)_140px] lg:gap-x-6"
              >
                <span className="font-mono text-[12px] text-t3">{w.year}</span>
                <span className="flex items-center gap-2 md:gap-3">
                  <span className="whitespace-nowrap font-sans font-medium transition-colors group-hover:text-accent md:text-[16px]">{w.title}</span>
                  {w.award && (
                    <span aria-label={w.award} title={w.award} className="shrink-0 rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] text-accent sm:text-[11px]">
                      <span aria-hidden="true" className="sm:hidden">金點</span>
                      <span aria-hidden="true" className="hidden sm:inline">{w.award.split(' · ')[0]}</span>
                    </span>
                  )}
                </span>
                <span className="order-4 col-span-2 col-start-2 text-[12px] leading-5 text-t2 lg:order-3 lg:col-span-1 lg:col-start-auto">{w.media.join(' · ')}</span>
                <span className="order-3 text-[12px] text-t2 lg:order-4 lg:text-[13px]">{w.context}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <Footer next={{ to: '/contact', label: 'Contact' }} />
    </main>
  )
}
