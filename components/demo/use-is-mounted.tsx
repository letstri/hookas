'use client'

import { useState } from 'react'
import { useIsMounted } from '../../registry/hooks/use-is-mounted'

export function IsMountedDemo() {
  const [showComponent, setShowComponent] = useState(true)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Component Mount Status</h3>
        <p className="text-sm text-gray-600">
          Toggle the component to see how useIsMounted tracks mount state.
        </p>

        <button
          onClick={() => setShowComponent(!showComponent)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
          type="button"
        >
          {showComponent ? 'Unmount' : 'Mount'}
          {' '}
          Component
        </button>
      </div>

      <div className="border-t pt-4">
        {showComponent
          ? (
              <MountStatusComponent />
            )
          : (
              <div className="text-gray-500 italic">Component is unmounted</div>
            )}
      </div>
    </div>
  )
}

function MountStatusComponent() {
  const isMounted = useIsMounted()
  const [renderCount, setRenderCount] = useState(1)

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded">
      <div className="text-lg font-medium">
        Component Status:
        {' '}
        {' '}
        <span className={isMounted ? 'text-green-600' : 'text-orange-600'}>
          {isMounted ? '✅ Mounted' : '⏳ Mounting...'}
        </span>
      </div>

      <div className="text-sm text-gray-600">
        Render count:
        {' '}
        {renderCount}
      </div>

      <button
        onClick={() => setRenderCount(prev => prev + 1)}
        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 w-fit text-sm"
        type="button"
      >
        Force Re-render
      </button>

      <div className="text-xs text-gray-500">
        useIsMounted returns
        {' '}
        {isMounted ? 'true' : 'false'}
        {' '}
        - useful for preventing state updates after unmount
      </div>
    </div>
  )
}
