import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import GameDetailPage from './pages/GameDetailPage'
import GamesPage from './pages/GamesPage'
import NewGamePage from './pages/NewGamePage'
import NotFoundPage from './pages/NotFoundPage'
import RootLayout from './pages/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: GamesPage },
      { path: 'games/new', Component: NewGamePage },
      { path: 'games/:id', Component: GameDetailPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App