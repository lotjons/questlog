import { Link, useNavigate, useParams } from 'react-router'
import EditGameForm from '../components/EditGameForm'
import { useGame, useSaveGame } from '../hooks/useGames'
import type { GameUpdate } from '../types'

const EditGamePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { game, isLoading, error } = useGame(id)
  const { updateGame, isSaving, error: saveError } = useSaveGame()

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

  const handleSubmit = async (changes: GameUpdate) => {
    const ok = await updateGame(game.id, changes)
    if (ok) navigate(`/games/${game.id}`)
  }

  return (
    <>
      <Link to={`/games/${game.id}`} className="mb-4 inline-block underline">
        ← Cancel
      </Link>
      <h1 className="mb-4 text-3xl font-bold">Edit {game.title}</h1>
      {saveError && (
        <p role="alert" className="mb-4 text-red-700">
          {saveError}
        </p>
      )}
      <EditGameForm game={game} onSubmit={handleSubmit} isSaving={isSaving} />
    </>
  )
}

export default EditGamePage
