import { NavLink, Outlet } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold underline underline-offset-4'
    : 'hover:underline underline-offset-4'

const RootLayout = () => {
  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b p-4">
        <NavLink to="/" className="text-xl font-bold">
          Questlog
        </NavLink>
        <nav className="flex gap-4">
          <NavLink to="/" end className={linkClass}>
            All games
          </NavLink>
          <NavLink to="/games/new" className={linkClass}>
            Add a game
          </NavLink>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
