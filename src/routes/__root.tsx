import { HeadContent, Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { Nav } from '../components/Nav'
import { PillLink } from '../components/ui'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* 讓各路由的 head({ meta }) 生效，例如分頁標題 */}
      <HeadContent />
      <Nav />
      <Outlet />
    </div>
  )
}

function NotFound() {
  return (
    <main className="page-enter flex flex-1 flex-col items-start justify-center gap-6 px-5 py-16 md:px-12">
      <p className="font-mono text-[12.5px] text-t3">404</p>
      <h1 className="font-sans text-[40px] font-bold leading-[1.05] tracking-tight md:text-[56px]">
        Page not found.
        <span className="mt-3 block font-zh text-[24px] font-bold md:text-[30px]">這一頁不存在。</span>
      </h1>
      <PillLink to="/">Back to About</PillLink>
      <Link to="/works" className="font-sans text-[14px] text-t2 underline decoration-hair-2 underline-offset-4 hover:text-t1">
        或看看作品
      </Link>
    </main>
  )
}
