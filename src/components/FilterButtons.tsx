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
    <fieldset className="mb-6">
      <legend className="mb-2 text-sm font-semibold">Show</legend>
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
                  ? 'rounded-full border bg-black px-4 py-2 text-white'
                  : 'rounded-full border px-4 py-2 hover:bg-gray-100'
              }
            >
              {isActive && '✓ '}
              {filter === 'all' ? 'All' : STATUS_LABELS[filter]}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default FilterButtons
