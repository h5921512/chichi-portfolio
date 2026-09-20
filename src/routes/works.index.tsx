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

      <ol className="m-0 mx-5 mt-8 list-none border-t border-hair p-0 md:mx-12 md:mt-10">
        {works.map((w, i) => (
          <li key={w.slug} className="border-b border-hair">
            <Link
              to="/works/$slug"
              params={{ slug: w.slug }}
              className="grid grid-cols-[30px_1fr_60px] items-baseline gap-3 py-3.5 text-[14px] transition-colors duration-150 hover:text-accent md:grid-cols-[36px_1.2fr_1fr_1fr_70px]"
            >
              <span className="font-mono text-[12px] text-t3">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-sans font-medium">{w.title}</span>
              <span className="hidden font-mono text-[12px] text-t3 md:block">{w.media.join(' · ')}</span>
              <span className="hidden text-[13px] text-accent md:block">{w.award?.split(' · ')[0]}</span>
              <span className="text-right font-mono text-[12px] text-t3">{w.year}</span>
            </Link>
          </li>
        ))}
      </ol>

      <Footer next={{ to: '/contact', label: 'Contact' }} />
    </main>
  )
}
