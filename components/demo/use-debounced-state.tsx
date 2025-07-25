'use client'

import { useDebouncedState } from '../../registry/hooks/use-debounced-state'

export function DebouncedStateDemo() {
  const [debouncedValue, value, setValue] = useDebouncedState('', 500)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="input" className="text-sm font-medium">
          Type something:
        </label>
        <input
          id="input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Start typing..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="font-medium">Current value:</span>
          {' '}
          <span className="text-gray-600">{value || '(empty)'}</span>
        </div>
        <div>
          <span className="font-medium">Debounced value (500ms delay):</span>
          {' '}
          <span className="text-blue-600">{debouncedValue || '(empty)'}</span>
        </div>
      </div>
    </div>
  )
}
