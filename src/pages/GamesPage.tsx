import GameList from '../components/GameList'
import { useGames } from '../hooks/useGames'

const GamesPage = () => {
  const { games, isLoading, error } = useGames('all')

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">My games</h1>

      {isLoading && <p role="status">Loading games...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && games.length === 0 && <p>No games here yet.</p>}
      {!isLoading && !error && games.length > 0 && <GameList games={games} />}
    </>
  )
}

export default GamesPage
