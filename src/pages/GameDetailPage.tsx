import { Link, useNavigate, useParams } from 'react-router'
import GameCover from '../components/GameCover'
import { useGame, useSaveGame } from '../hooks/useGames'
import { STATUS_LABELS } from '../types'
import { backLink, dangerButton, pageTitle, primaryButton } from '../ui'

const GameDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { game, isLoading, error } = useGame(id)
  const { deleteGame, isSaving, error: deleteError } = useSaveGame()

  if (isLoading)
    return (
      <p role="status" className="text-muted">
        Loading game...
      </p>
    )

  if (error || !game) {
    return (
      <>
        <h1 className={pageTitle}>{error || 'Game not found'}</h1>
        <Link to="/" className={backLink}>
          Back to all games
        </Link>
      </>
    )
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${game.title}? This can't be undone.`)) return
    const ok = await deleteGame(game.id)
    if (ok) navigate('/')
  }

  return (
    <article>
      <Link to="/" className={backLink}>
        ← All games
      </Link>

      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="w-full max-w-64 shrink-0">
          <GameCover
            title={game.title}
            coverUrl={game.coverUrl}
            alt={`Cover of ${game.title}`}
          />
        </div>

        <div className="flex-1">
          <h1 className="mb-6 font-display text-5xl leading-none">
            {game.title}
          </h1>

          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-line py-4">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              Platform
            </dt>
            <dd>{game.platform}</dd>
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              Status
            </dt>
            <dd className="text-sage">{STATUS_LABELS[game.status]}</dd>
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              Rating
            </dt>
            <dd>
              {game.rating !== null ? (
                <>
                  <span aria-hidden="true">★ </span>
                  {game.rating}/5
                </>
              ) : (
                'Not rated'
              )}
            </dd>
          </dl>

          {game.notes && (
            <section className="mt-6">
              <h2 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
                Notes
              </h2>
              <p className="max-w-prose">{game.notes}</p>
            </section>
          )}

          {deleteError && (
            <p role="alert" className="mt-6 text-danger">
              {deleteError}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/games/${game.id}/edit`} className={primaryButton}>
              Edit game
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving}
              className={dangerButton}
            >
              {isSaving ? 'Deleting...' : 'Delete game'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default GameDetailPage
