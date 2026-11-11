import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { type NewGame, STATUS_LABELS } from '../types'
import { field, fieldError, fieldInvalid, label, primaryButton } from '../ui'

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
      className="flex max-w-md flex-col gap-6"
    >
      <div>
        <label htmlFor="title" className={label}>
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
          className={errors.title ? fieldInvalid : field}
        />
        {errors.title && (
          <p id="title-error" className={fieldError}>
            <span aria-hidden="true">⚠ </span>
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="platform" className={label}>
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
          className={errors.platform ? fieldInvalid : field}
        />
        {errors.platform && (
          <p id="platform-error" className={fieldError}>
            <span aria-hidden="true">⚠ </span>
            {errors.platform}
          </p>
        )}
      </div>

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
        <button type="submit" disabled={isSaving} className={primaryButton}>
          {isSaving ? 'Saving...' : 'Add game'}
        </button>
      </div>
    </form>
  )
}

export default NewGameForm
