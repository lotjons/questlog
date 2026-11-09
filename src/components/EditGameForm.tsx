import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { type Game, type GameUpdate, STATUS_LABELS } from '../types'

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
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <label htmlFor="status" className="block font-semibold">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded border border-gray-500 bg-white p-2"
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="rating" className="block font-semibold">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full rounded border border-gray-500 bg-white p-2"
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
        <label htmlFor="notes" className="block font-semibold">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded border border-gray-500 bg-white p-2"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="self-start rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  )
}

export default EditGameForm
