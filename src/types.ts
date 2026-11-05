export type GameStatus = 'want' | 'playing' | 'completed' | 'dropped'

export type StatusFilter = GameStatus | 'all'

export type Game = {
  id: string
  title: string
  platform: string
  status: GameStatus
  rating: number | null
  coverUrl?: string
  notes?: string
  createdAt: string
  updatedAt: string
}
export type NewGame = Pick<Game, 'title' | 'platform' | 'status'>

export const STATUS_LABELS: Record<GameStatus, string> = {
  want: 'Want to play',
  playing: 'Playing',
  completed: 'Completed',
  dropped: 'Dropped',
}
