import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Game, GameUpdate, NewGame, StatusFilter } from '../types'

// All games, or only one status
export const useGames = (status: StatusFilter) => {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const url =
      status === 'all'
        ? `${API_URL}/games`
        : `${API_URL}/games?status=${status}`

    const fetchGames = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (ignore) return
        if (!response.ok) {
          setError(data.message ?? 'Could not load the games.')
          return
        }
        setGames(data)
      } catch {
        if (!ignore)
          setError('Could not reach the server. Check your connection.')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchGames()

    return () => {
      ignore = true
    }
  }, [status])

  return { games, isLoading, error }
}

// One game by id
export const useGame = (id: string | undefined) => {
  const [game, setGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let ignore = false

    const fetchGame = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_URL}/games/${id}`)
        const data = await response.json()

        if (ignore) return
        if (!response.ok) {
          setError(data.message ?? 'Could not find that game.')
          return
        }
        setGame(data)
      } catch {
        if (!ignore)
          setError('Could not reach the server. Check your connection.')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchGame()

    return () => {
      ignore = true
    }
  }, [id])

  return { game, isLoading, error }
}

// Create, update and delete games
export const useSaveGame = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const addGame = async (newGame: NewGame): Promise<Game | null> => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message ?? 'Could not save the game.')
        return null
      }
      return data
    } catch {
      setError('Could not reach the server. Check your connection.')
      return null
    } finally {
      setIsSaving(false)
    }
  }

  const updateGame = async (
    id: string,
    changes: GameUpdate,
  ): Promise<boolean> => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message ?? 'Could not update the game.')
        return false
      }
      return true
    } catch {
      setError('Could not reach the server. Check your connection.')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return { addGame, updateGame, isSaving, error }
}
