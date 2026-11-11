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
  const [isPaused, setIsPaused] = useLocalStorage(
    'questlog-motion-paused',
    false,
  )
  const { games, isLoading, error } = useGames(status)

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1
          className={
            isPaused
              ? 'origin-left font-display text-5xl'
              : 'origin-left animate-breathe font-display text-5xl motion-reduce:animate-none'
          }
        >
          My games
        </h1>
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="font-mono text-xs uppercase tracking-wider text-muted underline underline-offset-4 hover:text-fg motion-reduce:hidden"
        >
          {isPaused ? 'Play motion' : 'Pause motion'}
        </button>
      </div>

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
