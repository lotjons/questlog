import type { Game } from '../types'
import GameCard from './GameCard'

type GameListProps = {
  games: Game[]
}

const GameList = ({ games }: GameListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game} />
        </li>
      ))}
    </ul>
  )
}

export default GameList
