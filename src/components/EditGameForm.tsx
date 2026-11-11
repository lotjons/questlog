import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { type Game, type GameUpdate, STATUS_LABELS } from '../types'
import { field, label, primaryButton } from '../ui'

type EditGameFormProps = {
  game: Game
  onSubmit: (changes: GameUpdate) => void
  isSaving: boolean
}

const EditGameForm = ({ game, onSubmit, isSaving }: EditGameFormProps) => {
  const [form, setForm] = useState({
    status: game.status,
    rating: game.rating === null ? '' : String(game.rating),
    notes: game.notes,
  })

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({
      status: form.status,
      rating: form.rating === '' ? null : Number(form.rating),
      notes: form.notes.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-6">
      <div>
        <label htmlFor="status" className={label}>
          Status
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className={field}
        >
          {Object.entries(STATUS_LABELS).map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="rating" className={label}>
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className={field}
        >
          <option value="">Not rated</option>
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number}/5
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={form.notes}
          onChange={handleChange}
          className={field}
        />
      </div>

      <div>
        <button type="submit" disabled={isSaving} className={primaryButton}>
          {isSaving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}

export default EditGameForm
