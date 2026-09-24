import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { WorkGallery } from '../components/WorkGallery'
import { WorkVideo } from '../components/WorkVideo'
import { Facts, SectionTitle } from '../components/ui'
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
  const videos = (work.videos ?? (work.video ? [{ title: '作品影片', url: work.video }] : [])).map((video) => {
    const url = new URL(video.url)
    const isShort = url.pathname.startsWith('/shorts/')
    const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : isShort ? url.pathname.split('/')[2] : url.searchParams.get('v')
    return { ...video, id, isShort }
  })

  const facts = [
    { label: 'Media', value: work.media.join(', ') },
    { label: 'Role', value: work.roles.join('、') },
    { label: 'Year', value: work.year },
    ...(work.award ? [{ label: 'Award', value: work.award, accent: true }] : []),
    ...(work.team ? [{ label: 'Team', value: <span className="text-t3">{work.team}</span> }] : []),
  ]

  return (
    <main className="page-enter flex flex-1 flex-col">
      <div className="grid gap-7 px-5 pt-7 pb-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-14 md:px-12 md:pt-10 md:pb-14">
        <aside className="order-2 md:order-1 md:row-span-2 md:sticky md:top-5 md:self-start">
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
          {work.website && (
            <a href={work.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block py-2 text-[14px] text-accent underline underline-offset-4 hover:text-t1">
              專案官網 ↗
            </a>
          )}
          {work.store && (
            <a href={work.store} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block py-2 text-[14px] text-accent underline underline-offset-4 hover:text-t1">
              Meta Quest 商店 ↗
            </a>
          )}
        </aside>

        {videos.length > 0 && (
          <div className="order-1 grid min-w-0 gap-7 md:order-2">
            {videos.map((video) => video.id && (
              <section key={video.id} aria-label={video.title}>
                {videos.length > 1 && <h2 className="mb-3 text-[15px] font-medium">{video.title}</h2>}
                <WorkVideo id={video.id} title={`${work.title} ${video.title}`} isShort={video.isShort} />
              </section>
            ))}
            {work.mobileVideo && (
              <a href={work.mobileVideo} target="_blank" rel="noopener noreferrer" className="w-fit py-2 text-[14px] text-accent underline underline-offset-4 hover:text-t1">
                手機版影片 ↗
              </a>
            )}
          </div>
        )}
        <article className="order-3 grid min-w-0 gap-7 md:col-start-2">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <SectionTitle en="Concept" zh="創作理念" />
              <p className="m-0 text-[14.5px] leading-[1.9] text-t2">{work.concept}</p>
            </div>
            <div>
              <SectionTitle en="Controls" zh="操作" />
              <div className="grid gap-5">
                {(work.controlGroups ?? [{ title: '', controls: work.controls ?? [] }]).map((group) => (
                  <div key={group.title}>
                    {group.title && <h3 className="mb-2 text-[14px] font-medium text-t1">{group.title}</h3>}
                    <ul className="m-0 grid list-none grid-cols-[minmax(70px,max-content)_minmax(0,1fr)] gap-x-3.5 p-0">
                      {group.controls.map((c) => (
                        <li
                          key={c.key + c.text}
                          className="col-span-2 grid grid-cols-subgrid border-t border-hair py-[7px] text-[14px] text-t2"
                        >
                          <span className="whitespace-nowrap pt-0.5 font-mono text-[12px] text-t1">{c.key}</span>
                          <span>{c.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <WorkGallery key={work.slug} title={work.title} images={[work.cover, ...work.gallery]} portrait={work.slug === 'sphere-lab'} />
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
