'use client'

import { useState } from 'react'
import { useAsyncEffect } from '../../registry/hooks/use-async-effect'

export function AsyncEffectDemo() {
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [fetchCount, setFetchCount] = useState(0)

  const triggerFetch = () => {
    setFetchCount(prev => prev + 1)
  }

  // Async effect that fetches data
  useAsyncEffect(async () => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call delay
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 1000)
        return () => clearTimeout(timer)
      })

      if (Math.random() > 0.7) {
        throw new Error('Random API error!')
      }

      setData(`Fetched data #${fetchCount} at ${new Date().toLocaleTimeString()}`)
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
    finally {
      setLoading(false)
    }

    // Cleanup function
    return () => {
      // This runs when the effect is cleaned up
    }
  }, [fetchCount])

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Async Effect Demo</h3>
        <p className="text-sm text-gray-600">
          useAsyncEffect allows you to run async operations in effects with proper cleanup.
        </p>

        <button
          onClick={triggerFetch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 w-fit"
          type="button"
        >
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium">Status</h4>
          <div className="text-sm mt-2 space-y-1">
            <div>
              Fetch count:
              <span className="font-mono">{fetchCount}</span>
            </div>
            <div>
              Loading:
              {loading ? '🔄 Yes' : '✅ No'}
            </div>
            <div>
              Error:
              {error ? `❌ ${error}` : '✅ None'}
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium">Data</h4>
          <div className="text-sm mt-2">
            {data || <span className="text-gray-500">No data fetched yet</span>}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        This hook handles async operations in effects properly, including cleanup.
        There's a 30% chance of a simulated error to demonstrate error handling.
      </div>
    </div>
  )
}
