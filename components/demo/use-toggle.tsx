'use client'

import { useToggle } from '../../registry/hooks/use-toggle'

export function ToggleDemo() {
  const [isOn, toggle] = useToggle(false)

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <button
        onClick={() => toggle()}
        className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        type="button"
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
      <span className="text-sm text-gray-600">
        State:
        {' '}
        {isOn ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  )
}
