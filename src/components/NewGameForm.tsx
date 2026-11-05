import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { type NewGame, STATUS_LABELS } from '../types'

type FormErrors = Partial<Record<'title' | 'platform', string>>

const validate = (form: NewGame): FormErrors => {
  const errors: FormErrors = {}
  if (!form.title.trim()) errors.title = 'Please enter a title.'
  if (!form.platform.trim()) errors.platform = 'Please enter a platform.'
  return errors
}

type NewGameFormProps = {
  onSubmit: (game: NewGame) => void
  isSaving: boolean
}

const NewGameForm = ({ onSubmit, isSaving }: NewGameFormProps) => {
  const [form, setForm] = useState<NewGame>({
    title: '',
    platform: '',
    status: 'want',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: undefined })
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      platform: form.platform.trim(),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <label htmlFor="title" className="block font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          className={
            errors.platform
              ? 'w-full rounded border-2 border-red-700 bg-white p-2'
              : 'w-full rounded border border-gray-500 bg-white p-2'
          }
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-red-700">
            ⚠ {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="platform" className="block font-semibold">
          Platform
        </label>
        <input
          id="platform"
          name="platform"
          required
          value={form.platform}
          onChange={handleChange}
          aria-invalid={Boolean(errors.platform)}
          aria-describedby={errors.platform ? 'platform-error' : undefined}
          className={
            errors.platform
              ? 'w-full rounded border-2 border-red-700 bg-white p-2'
              : 'w-full rounded border border-gray-500 bg-white p-2'
          }
        />
        {errors.platform && (
          <p id="platform-error" className="mt-1 text-red-700">
            ⚠ {errors.platform}
          </p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={isSaving}
        className="self-start rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Add game'}
      </button>
    </form>
  )
}

export default NewGameForm
