import { Link } from 'react-router'
import { type Game, STATUS_LABELS } from '../types'
import GameCover from './GameCover'

type GameCardProps = {
  game: Game
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group block h-full rounded-md border border-line bg-surface p-2 transition-colors hover:border-field"
    >
      <GameCover title={game.title} coverUrl={game.coverUrl} alt="" />
      <div className="px-1 pt-3 pb-1">
        <h2 className="font-semibold leading-snug underline-offset-4 group-hover:underline">
          {game.title}
        </h2>
        <p className="mt-1 font-mono text-xs text-muted">
          {game.platform} ·{' '}
          {game.rating !== null ? (
            <>
              <span aria-hidden="true">★</span> {game.rating}/5
            </>
          ) : (
            'Not rated'
          )}
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-sage">
          <span aria-hidden="true">● </span>
          {STATUS_LABELS[game.status]}
        </p>
      </div>
    </Link>
  )
}

export default GameCard
