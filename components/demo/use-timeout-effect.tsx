'use client'

import { useState } from 'react'
import { useTimeoutEffect } from '../../registry/hooks/use-timeout-effect'

export function TimeoutEffectDemo() {
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [timeoutDuration, setTimeoutDuration] = useState(3000)

  const startDemo = () => {
    setMessage('Starting countdown...')
    setIsVisible(true)
    setCountdown(timeoutDuration / 1000)
  }

  const resetDemo = () => {
    setMessage('')
    setIsVisible(false)
    setCountdown(0)
  }

  // Show message after timeout
  useTimeoutEffect(() => {
    setMessage('Timeout completed! 🎉')
    setCountdown(0)
  }, timeoutDuration, [isVisible, timeoutDuration])

  // Countdown timer
  useTimeoutEffect(() => {
    if (countdown > 0) {
      setCountdown(prev => prev - 1)
    }
  }, 1000, [countdown])

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Timeout Effect Demo</h3>

        <div className="flex flex-col gap-1">
          <label htmlFor="duration" className="text-sm font-medium">
            Timeout Duration:
            {' '}
            {timeoutDuration}
            ms
          </label>
          <input
            id="duration"
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={timeoutDuration}
            onChange={e => setTimeoutDuration(Number(e.target.value))}
            className="w-full"
            disabled={isVisible}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={startDemo}
            disabled={isVisible}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="button"
          >
            Start Timeout
          </button>
          <button
            onClick={resetDemo}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t pt-4">
        <div className="min-h-[60px] flex items-center justify-center">
          {countdown > 0 && (
            <div className="text-center">
              <div className="text-2xl font-mono text-blue-600">{countdown}</div>
              <div className="text-sm text-gray-500">seconds remaining</div>
            </div>
          )}
          {message && countdown === 0 && (
            <div className="text-center">
              <div className="text-lg text-green-600">{message}</div>
            </div>
          )}
          {!isVisible && !message && (
            <div className="text-gray-400">Click "Start Timeout" to begin</div>
          )}
        </div>
      </div>
    </div>
  )
}
