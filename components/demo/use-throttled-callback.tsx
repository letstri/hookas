'use client'

import { useState } from 'react'
import { useThrottledCallback } from '../../registry/hooks/use-throttled-callback'

export function ThrottledCallbackDemo() {
  const [scrollCount, setScrollCount] = useState(0)
  const [throttledScrollCount, setThrottledScrollCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleScroll = () => {
    setScrollCount(prev => prev + 1)
  }

  const throttledHandleScroll = useThrottledCallback(() => {
    setThrottledScrollCount(prev => prev + 1)
  }, [setThrottledScrollCount], 100)

  const throttledMouseMove = useThrottledCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [setMousePosition], 50)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Scroll Event Throttling</h3>
        <div
          className="h-32 overflow-y-auto border rounded bg-gray-50 p-2"
          onScroll={() => {
            handleScroll()
            throttledHandleScroll()
          }}
        >
          <div className="h-64 flex items-center justify-center text-gray-500">
            Scroll me! This content is tall enough to scroll.
            <br />
            Keep scrolling to see the throttling effect.
          </div>
        </div>
        <div className="text-sm">
          <div>
            <span className="font-medium">Normal scroll events:</span>
            {' '}
            <span className="text-red-600">{scrollCount}</span>
          </div>
          <div>
            <span className="font-medium">Throttled scroll events (100ms):</span>
            {' '}
            <span className="text-blue-600">{throttledScrollCount}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Mouse Move Throttling</h3>
        <button
          className="h-24 border rounded bg-gray-50 cursor-crosshair flex items-center justify-center text-sm text-gray-600 w-full"
          onMouseMove={throttledMouseMove}
          type="button"
        >
          Move mouse here: (
          {mousePosition.x}
          ,
          {' '}
          {mousePosition.y}
          )
        </button>
        <p className="text-xs text-gray-500">
          Mouse position updates are throttled to every 50ms
        </p>
      </div>
    </div>
  )
}
