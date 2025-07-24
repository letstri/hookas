'use client'

import React, { useState } from 'react'
import { useMountedEffect } from '../../registry/hooks/use-mounted-effect'

export function MountedEffectDemo() {
  const [count, setCount] = useState(0)
  const [mountedEffectCount, setMountedEffectCount] = useState(0)
  const [regularEffectCount, setRegularEffectCount] = useState(0)
  const [showComponent, setShowComponent] = useState(true)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Mounted Effect vs Regular Effect</h3>
        <p className="text-sm text-gray-600">
          The mounted effect only runs after the first render, while regular useEffect runs on mount too.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setShowComponent(!showComponent)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="button"
          >
            {showComponent ? 'Hide' : 'Show'}
            {' '}
            Component
          </button>
        </div>
      </div>

      {showComponent && (
        <EffectTestComponent
          count={count}
          setCount={setCount}
          setMountedEffectCount={setMountedEffectCount}
          setRegularEffectCount={setRegularEffectCount}
        />
      )}

      <div className="flex flex-col gap-2 border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Regular useEffect calls:</span>
            {' '}
            <span className="text-red-600">{regularEffectCount}</span>
          </div>
          <div>
            <span className="font-medium">useMountedEffect calls:</span>
            {' '}
            <span className="text-blue-600">{mountedEffectCount}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Notice how mounted effect doesn't run on initial mount, only on subsequent updates.
        </p>
      </div>
    </div>
  )
}

function EffectTestComponent({
  count,
  setCount,
  setMountedEffectCount,
  setRegularEffectCount,
}: {
  count: number
  setCount: (fn: (prev: number) => number) => void
  setMountedEffectCount: (fn: (prev: number) => number) => void
  setRegularEffectCount: (fn: (prev: number) => number) => void
}) {
  // Regular useEffect - runs on mount and when count changes
  React.useEffect(() => {
    setRegularEffectCount(prev => prev + 1)
  }, [count, setRegularEffectCount])

  // Mounted effect - only runs when count changes, NOT on mount
  useMountedEffect(() => {
    setMountedEffectCount(prev => prev + 1)
  }, [count])

  return (
    <div className="flex flex-col gap-2 border p-3 rounded bg-gray-50">
      <div className="text-lg font-mono">
        Count:
        {count}
      </div>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        type="button"
      >
        Increment Count
      </button>
    </div>
  )
}
