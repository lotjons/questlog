export type GameStatus = 'want' | 'playing' | 'completed' | 'dropped'

export type Game = {
  id: string
  title: string
  platform: string
  status: GameStatus
  rating?: number
  coverUrl?: string
  notes?: string
}

export const STATUS_LABELS: Record<GameStatus, string> = {
  want: 'Want to play',
  playing: 'Playing',
  completed: 'Completed',
  dropped: 'Dropped',
}
