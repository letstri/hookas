'use client'

import { useState } from 'react'
import { useInitializedEffectOnce } from '../../registry/hooks/use-initialized-effect-once'

export function InitializedEffectOnceDemo() {
  const [user, setUser] = useState<{ id: number, name: string } | undefined>()
  const [config, setConfig] = useState<{ theme: string } | undefined>()
  const [initCount, setInitCount] = useState(0)
  const [changeCount, setChangeCount] = useState(0)

  // This effect runs only ONCE when both dependencies are defined,
  // not on subsequent changes
  useInitializedEffectOnce(() => {
    setInitCount(prev => prev + 1)
  }, [user, config])

  const loadUser = () => {
    setUser({ id: 1, name: 'John Doe' })
  }

  const loadConfig = () => {
    setConfig({ theme: 'dark' })
  }

  const changeUser = () => {
    setUser(prev => prev ? { ...prev, name: `User ${Date.now()}` } : undefined)
    setChangeCount(prev => prev + 1)
  }

  const changeConfig = () => {
    setConfig(prev => prev ? { ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' } : undefined)
    setChangeCount(prev => prev + 1)
  }

  const reset = () => {
    setUser(undefined)
    setConfig(undefined)
    setInitCount(0)
    setChangeCount(0)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Initialized Effect Once Demo</h3>
        <p className="text-sm text-gray-600">
          The effect runs only once when all dependencies are first defined, not on subsequent changes.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={loadUser}
          disabled={user !== undefined}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          type="button"
        >
          Load User
        </button>
        <button
          onClick={loadConfig}
          disabled={config !== undefined}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
          type="button"
        >
          Load Config
        </button>
        <button
          onClick={changeUser}
          disabled={!user}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300"
          type="button"
        >
          Change User
        </button>
        <button
          onClick={changeConfig}
          disabled={!config}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
          type="button"
        >
          Change Config
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium">Status</h4>
          <div className="text-sm mt-2 space-y-1">
            <div>
              User:
              {user ? `✅ ${user.name}` : '❌ Not loaded'}
            </div>
            <div>
              Config:
              {config ? `✅ ${config.theme}` : '❌ Not loaded'}
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium">Effect Metrics</h4>
          <div className="text-sm mt-2 space-y-1">
            <div>
              Init effect runs:
              <span className="font-mono text-blue-600">{initCount}</span>
            </div>
            <div>
              Value changes:
              <span className="font-mono text-orange-600">{changeCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Notice how the effect only runs once when both dependencies are first defined,
        even when you change their values later.
      </div>
    </div>
  )
}
