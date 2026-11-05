import { useNavigate } from 'react-router'
import NewGameForm from '../components/NewGameForm'
import { useSaveGame } from '../hooks/useGames'
import type { NewGame } from '../types'

const NewGamePage = () => {
  const navigate = useNavigate()
  const { addGame, isSaving, error } = useSaveGame()

  const handleSubmit = async (newGame: NewGame) => {
    const game = await addGame(newGame)
    if (game) navigate(`/games/${game.id}`)
  }

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Add a game</h1>
      {error && (
        <p role="alert" className="mb-4 text-red-700">
          {error}
        </p>
      )}
      <NewGameForm onSubmit={handleSubmit} isSaving={isSaving} />
    </>
  )
}

export default NewGamePage
