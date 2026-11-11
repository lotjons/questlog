import { STATUS_LABELS, type StatusFilter } from '../types'

const FILTERS: StatusFilter[] = [
  'all',
  'want',
  'playing',
  'completed',
  'dropped',
]

type FilterButtonsProps = {
  selected: StatusFilter
  onChange: (status: StatusFilter) => void
}

const FilterButtons = ({ selected, onChange }: FilterButtonsProps) => {
  return (
    <fieldset className="mb-8">
      <legend className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
        Show
      </legend>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = filter === selected
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(filter)}
              className={
                isActive
                  ? 'min-h-11 rounded-full border border-forest-line bg-forest px-4 font-mono text-xs uppercase tracking-wider text-fg'
                  : 'min-h-11 rounded-full border border-line px-4 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-field'
              }
            >
              {isActive && <span aria-hidden="true">✓ </span>}
              {filter === 'all' ? 'All' : STATUS_LABELS[filter]}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default FilterButtons
