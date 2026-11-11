import FilterButtons from '../components/FilterButtons'
import GameList from '../components/GameList'
import { useGames } from '../hooks/useGames'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { StatusFilter } from '../types'

const GamesPage = () => {
  const [status, setStatus] = useLocalStorage<StatusFilter>(
    'questlog-status',
    'all',
  )
  const { games, isLoading, error } = useGames(status)

  return (
    <>
      <h1 className="mb-6 font-display text-5xl">My games</h1>

      <FilterButtons selected={status} onChange={setStatus} />

      {isLoading && (
        <p role="status" className="text-muted">
          Loading games...
        </p>
      )}
      {error && (
        <p role="alert" className="text-danger">
          {error}
        </p>
      )}
      {!isLoading && !error && games.length === 0 && (
        <p className="text-muted">No games here yet.</p>
      )}
      {!isLoading && !error && games.length > 0 && <GameList games={games} />}
    </>
  )
}

export default GamesPage
