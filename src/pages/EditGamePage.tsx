import { Link, useNavigate, useParams } from 'react-router'
import EditGameForm from '../components/EditGameForm'
import { useGame, useSaveGame } from '../hooks/useGames'
import type { GameUpdate } from '../types'
import { alert, backLink, pageTitle } from '../ui'

const EditGamePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { game, isLoading, error } = useGame(id)
  const { updateGame, isSaving, error: saveError } = useSaveGame()

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

  const handleSubmit = async (changes: GameUpdate) => {
    const ok = await updateGame(game.id, changes)
    if (ok) navigate(`/games/${game.id}`)
  }

  return (
    <>
      <Link to={`/games/${game.id}`} className={backLink}>
        ← Cancel
      </Link>
      <h1 className={pageTitle}>Edit {game.title}</h1>
      {saveError && (
        <p role="alert" className={alert}>
          {saveError}
        </p>
      )}
      <EditGameForm game={game} onSubmit={handleSubmit} isSaving={isSaving} />
    </>
  )
}

export default EditGamePage
