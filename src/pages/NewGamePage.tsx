import { useNavigate } from 'react-router'
import NewGameForm from '../components/NewGameForm'
import { useSaveGame } from '../hooks/useGames'
import type { NewGame } from '../types'
import { alert, pageTitle } from '../ui'

const NewGamePage = () => {
  const navigate = useNavigate()
  const { addGame, isSaving, error } = useSaveGame()

  const handleSubmit = async (newGame: NewGame) => {
    const game = await addGame(newGame)
    if (game) navigate(`/games/${game.id}`)
  }

  return (
    <>
      <h1 className={pageTitle}>Add a game</h1>
      {error && (
        <p role="alert" className={alert}>
          {error}
        </p>
      )}
      <NewGameForm onSubmit={handleSubmit} isSaving={isSaving} />
    </>
  )
}

export default NewGamePage
