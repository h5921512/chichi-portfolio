import { useState } from 'react'

export function WorkVideo({ id, title, isShort }: { id: string; title: string; isShort: boolean }) {
  const [playing, setPlaying] = useState(false)
  const dimensions = isShort ? 'aspect-[9/16] w-[min(360px,39.375svh,100%)]' : 'aspect-video w-full'

  return (
    <div className="flex min-w-0 justify-center overflow-hidden rounded-m bg-s2">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className={`${dimensions} border-0`}
        />
      ) : (
        <button type="button" aria-label={`播放${title}`} onClick={() => setPlaying(true)} className={`${dimensions} group relative overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
          <span className="relative inline-flex min-h-12 items-center gap-2 rounded-full bg-black/80 px-5 py-3 text-white"><span aria-hidden="true">▶</span> 播放影片</span>
        </button>
      )}
    </div>
  )
}
