import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Game, StatusFilter } from '../types'

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
