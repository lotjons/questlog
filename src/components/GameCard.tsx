import { Link } from 'react-router'
import { type Game, STATUS_LABELS } from '../types'

type GameCardProps = {
  game: Game
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="block rounded border p-3 hover:shadow"
    >
      {game.coverUrl && (
        <img
          src={game.coverUrl}
          alt=""
          className="mb-3 aspect-3/4 w-full rounded object-cover"
        />
      )}
      <h2 className="text-lg font-semibold">{game.title}</h2>
      <p className="text-sm">{game.platform}</p>
      <p className="text-sm">{STATUS_LABELS[game.status]}</p>
      <p className="text-sm">
        {game.rating !== null ? `${game.rating}/5` : 'Not rated'}
      </p>
    </Link>
  )
}

export default GameCard
