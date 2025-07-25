'use client'

import { useState } from 'react'
import { useDebouncedMemo } from '../../registry/hooks/use-debounced-memo'

export function DebouncedMemoDemo() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(2)

  // Expensive computation that will be debounced
  const expensiveValue = useDebouncedMemo(() => {
    // Simulate expensive computation
    return count * multiplier
  }, [count, multiplier], 500)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="count" className="text-sm font-medium">
          Count:
          {' '}
          {count}
        </label>
        <input
          id="count"
          type="range"
          min="0"
          max="100"
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="multiplier" className="text-sm font-medium">
          Multiplier:
          {' '}
          {multiplier}
        </label>
        <input
          id="multiplier"
          type="range"
          min="1"
          max="10"
          value={multiplier}
          onChange={e => setMultiplier(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="font-medium">Current calculation:</span>
          {' '}
          <span className="text-gray-600">
            {count}
            {' '}
            ×
            {' '}
            {multiplier}
            {' '}
            =
            {' '}
            {count * multiplier}
          </span>
        </div>
        <div>
          <span className="font-medium">Debounced result (500ms delay):</span>
          {' '}
          <span className="text-blue-600">{expensiveValue}</span>
        </div>
        <p className="text-xs text-gray-500">
          Move the sliders to see debounced computation
        </p>
      </div>
    </div>
  )
}
