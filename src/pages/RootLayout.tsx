import { NavLink, Outlet } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-fg underline decoration-sage decoration-2 underline-offset-8'
    : 'text-muted underline-offset-8 hover:text-fg hover:underline'

const RootLayout = () => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded focus:bg-forest focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 py-5">
          <NavLink to="/" className="font-display text-3xl">
            Questlog
          </NavLink>
          <nav aria-label="Main" className="flex gap-6 text-sm">
            <NavLink to="/" end className={linkClass}>
              All games
            </NavLink>
            <NavLink to="/games/new" className={linkClass}>
              Add a game
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
