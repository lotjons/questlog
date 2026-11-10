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
      <h1 className="mb-4 text-3xl font-bold">My games</h1>

      <FilterButtons selected={status} onChange={setStatus} />

      {isLoading && <p role="status">Loading games...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && games.length === 0 && <p>No games here yet.</p>}
      {!isLoading && !error && games.length > 0 && <GameList games={games} />}
    </>
  )
}

export default GamesPage
