import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Facts, PillAnchor, SectionTitle } from '../components/ui'
import { getAdjacent, getWork } from '../data/works'

export const Route = createFileRoute('/works/$slug')({
  loader: ({ params }) => {
    const work = getWork(params.slug)
    if (!work) throw notFound()
    return { work, ...getAdjacent(params.slug) }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.work.title ?? 'Work'} — Chi Chi-Feng` }],
  }),
  component: WorkDetail,
})

function WorkDetail() {
  const { work, prev, next } = Route.useLoaderData()

  const facts = [
    { label: 'Media', value: work.media.join(', ') },
    { label: 'Role', value: work.roles.join('、') },
    { label: 'Year', value: work.year },
    ...(work.award ? [{ label: 'Award', value: work.award, accent: true }] : []),
    { label: 'Team', value: <span className="text-t3">{work.team ?? '＿ 人 · ＿ 個月'}</span> },
  ]

  return (
    <main className="page-enter flex flex-1 flex-col">
      <div className="grid gap-7 px-5 pt-7 pb-10 md:grid-cols-[280px_1fr] md:gap-14 md:px-12 md:pt-10 md:pb-14">
        <aside className="md:sticky md:top-5 md:self-start">
          <Link to="/works" className="font-sans text-[13px] text-t2 transition-colors hover:text-t1">
            ← All works
          </Link>
          <h1 className="mt-[18px] font-sans text-[30px] font-bold leading-[1.05] tracking-[-.03em] md:text-[34px]">
            {work.title}
            <span className="mt-3 block font-zh text-[13.5px] font-normal leading-[1.75] tracking-normal text-t2">
              {work.category}。{work.concept}
            </span>
          </h1>
          <div className="mt-5">
            <Facts items={facts} />
          </div>
          {work.video && (
            <PillAnchor href={work.video} target="_blank" rel="noreferrer" className="mt-5">
              Watch video
            </PillAnchor>
          )}
        </aside>

        <article className="grid gap-7">
          <img
            src={work.cover}
            alt={`${work.title} 主視覺`}
            width={1280}
            height={720}
            className="aspect-video w-full rounded-m object-cover"
          />
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <SectionTitle en="Concept" zh="創作理念" />
              <p className="m-0 text-[14.5px] leading-[1.9] text-t2">{work.concept}</p>
            </div>
            <div>
              <SectionTitle en="Controls" zh="操作" />
              <ul className="m-0 list-none p-0">
                {work.controls.map((c) => (
                  <li
                    key={c.key + c.text}
                    className="grid grid-cols-[70px_1fr] gap-3.5 border-t border-hair py-[7px] text-[14px] text-t2"
                  >
                    <span className="pt-0.5 font-mono text-[12px] text-t1">{c.key}</span>
                    <span>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {work.gallery.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {work.gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${work.title} 畫面 ${i + 1}`}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="aspect-video w-full rounded-m object-cover"
                />
              ))}
            </div>
          )}
          <nav className="flex items-end justify-between border-t border-hair pt-5" aria-label="上一件 / 下一件">
            {prev ? (
              <Link to="/works/$slug" params={{ slug: prev.slug }} className="group">
                <span className="mb-1.5 block font-mono text-[11.5px] text-t3">Previous</span>
                <span className="font-sans text-[18px] font-bold tracking-tight transition-colors group-hover:text-accent">
                  ← {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to="/works/$slug" params={{ slug: next.slug }} className="group text-right">
                <span className="mb-1.5 block font-mono text-[11.5px] text-t3">Next</span>
                <span className="font-sans text-[18px] font-bold tracking-tight transition-colors group-hover:text-accent">
                  {next.title} →
                </span>
              </Link>
            ) : (
              <Link to="/contact" className="group text-right">
                <span className="mb-1.5 block font-mono text-[11.5px] text-t3">Next</span>
                <span className="font-sans text-[18px] font-bold tracking-tight transition-colors group-hover:text-accent">
                  Contact →
                </span>
              </Link>
            )}
          </nav>
        </article>
      </div>
      <Footer right={<span>{work.year}</span>} />
    </main>
  )
}
