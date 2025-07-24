'use client'

import { useState } from 'react'
import { useInitializedEffect } from '../../registry/hooks/use-initialized-effect'

export function InitializedEffectDemo() {
  const [user, setUser] = useState<{ id: number, name: string } | undefined>()
  const [profile, setProfile] = useState<{ bio: string } | undefined>()
  const [data, setData] = useState('')
  const [effectRunCount, setEffectRunCount] = useState(0)

  // This effect only runs when both user and profile are defined
  useInitializedEffect(() => {
    setEffectRunCount(prev => prev + 1)
    if (user && profile) {
      setData(`User: ${user.name}, Bio: ${profile.bio}`)
    }
  }, [user, profile])

  const loadUser = () => {
    setUser({ id: 1, name: 'John Doe' })
  }

  const loadProfile = () => {
    setProfile({ bio: 'Software Developer' })
  }

  const reset = () => {
    setUser(undefined)
    setProfile(undefined)
    setData('')
    setEffectRunCount(0)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Initialized Effect Demo</h3>
        <p className="text-sm text-gray-600">
          The effect only runs when all dependencies are defined (not undefined).
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
          onClick={loadProfile}
          disabled={profile !== undefined}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
          type="button"
        >
          Load Profile
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
          <h4 className="font-medium">Data Status</h4>
          <div className="text-sm mt-2 space-y-1">
            <div>
              User:
              {user ? '✅ Loaded' : '❌ Not loaded'}
            </div>
            <div>
              Profile:
              {profile ? '✅ Loaded' : '❌ Not loaded'}
            </div>
            <div>
              Effect runs:
              <span className="font-mono">{effectRunCount}</span>
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium">Combined Data</h4>
          <div className="text-sm mt-2">
            {data || <span className="text-gray-500">No data (effect hasn't run)</span>}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Notice how the effect only runs once both dependencies are defined, not when they're undefined.
      </div>
    </div>
  )
}
