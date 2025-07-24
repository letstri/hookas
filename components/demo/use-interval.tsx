'use client'

import { useState } from 'react'
import { useInterval } from '../../registry/hooks/use-interval'

export function IntervalDemo() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [delay, setDelay] = useState(1000)

  // Counter that increments every second when running
  useInterval(() => {
    if (isRunning) {
      setCount(prev => prev + 1)
    }
  }, delay)

  // Clock that updates every second
  useInterval(() => {
    setCurrentTime(new Date())
  }, 1000)

  const resetCounter = () => {
    setCount(0)
    setIsRunning(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Auto Counter</h3>
        <div className="text-2xl font-mono text-blue-600">{count}</div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1 text-sm rounded ${
              isRunning
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            type="button"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={resetCounter}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            type="button"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="delay" className="text-sm font-medium">
            Delay:
            {' '}
            {delay}
            ms
          </label>
          <input
            id="delay"
            type="range"
            min="100"
            max="2000"
            step="100"
            value={delay}
            onChange={e => setDelay(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t pt-4">
        <h3 className="font-medium">Live Clock</h3>
        <div className="text-lg font-mono text-gray-700">
          {currentTime.toLocaleTimeString()}
        </div>
        <p className="text-xs text-gray-500">
          Updates every second using useInterval
        </p>
      </div>
    </div>
  )
}
