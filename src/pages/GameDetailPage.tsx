import { Link, useNavigate, useParams } from 'react-router'
import { useGame, useSaveGame } from '../hooks/useGames'
import { STATUS_LABELS } from '../types'

const GameDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { game, isLoading, error } = useGame(id)
  const { deleteGame, isSaving, error: deleteError } = useSaveGame()

  if (isLoading) return <p role="status">Loading game...</p>

  if (error || !game) {
    return (
      <>
        <h1 className="mb-4 text-3xl font-bold">{error || 'Game not found'}</h1>
        <Link to="/" className="underline">
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
    <article className="max-w-2xl">
      <Link to="/" className="mb-4 inline-block underline">
        ← All games
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row">
        {game.coverUrl && (
          <img
            src={game.coverUrl}
            alt={`Cover of ${game.title}`}
            className="aspect-3/4 w-48 rounded object-cover"
          />
        )}

        <div>
          <h1 className="mb-4 text-3xl font-bold">{game.title}</h1>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="font-semibold">Platform</dt>
            <dd>{game.platform}</dd>
            <dt className="font-semibold">Status</dt>
            <dd>{STATUS_LABELS[game.status]}</dd>
            <dt className="font-semibold">Rating</dt>
            <dd>{game.rating !== null ? `${game.rating}/5` : 'Not rated'}</dd>
          </dl>

          {game.notes && (
            <section className="mt-4">
              <h2 className="font-semibold">Notes</h2>
              <p>{game.notes}</p>
            </section>
          )}

          {deleteError && (
            <p role="alert" className="mt-4 text-red-700">
              {deleteError}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/games/${game.id}/edit`}
              className="rounded bg-black px-4 py-2 text-white"
            >
              Edit game
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving}
              className="rounded border-2 border-red-700 px-4 py-2 text-red-700 disabled:opacity-50"
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
