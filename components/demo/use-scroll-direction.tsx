'use client'

import { useRef } from 'react'
import { useScrollDirection } from '../../registry/hooks/use-scroll-direction'

export function ScrollDirectionDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const globalDirection = useScrollDirection()
  const localDirection = useScrollDirection(containerRef, 300)

  const getDirectionEmoji = (direction: string | null) => {
    switch (direction) {
      case 'up': return '⬆️'
      case 'down': return '⬇️'
      case 'left': return '⬅️'
      case 'right': return '➡️'
      default: return '⏸️'
    }
  }

  const getDirectionColor = (direction: string | null) => {
    switch (direction) {
      case 'up': return 'bg-blue-100 text-blue-800'
      case 'down': return 'bg-green-100 text-green-800'
      case 'left': return 'bg-yellow-100 text-yellow-800'
      case 'right': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Scroll Direction Demo</h3>
        <p className="text-sm text-gray-600">
          Scroll the page or the container below to see direction detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-blue-50">
          <h4 className="font-medium text-blue-800 mb-3">Global Scroll Direction</h4>
          <div className="flex items-center justify-center gap-2">
            <div className={`px-4 py-2 rounded-full text-lg ${getDirectionColor(globalDirection)}`}>
              {getDirectionEmoji(globalDirection)}
            </div>
            <div className="text-center">
              <div className="font-medium">{globalDirection || 'stopped'}</div>
              <div className="text-xs text-gray-600">Page scroll</div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded bg-green-50">
          <h4 className="font-medium text-green-800 mb-3">Container Scroll Direction</h4>
          <div className="flex items-center justify-center gap-2">
            <div className={`px-4 py-2 rounded-full text-lg ${getDirectionColor(localDirection)}`}>
              {getDirectionEmoji(localDirection)}
            </div>
            <div className="text-center">
              <div className="font-medium">{localDirection || 'stopped'}</div>
              <div className="text-xs text-gray-600">Container scroll</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Scrollable Container</h4>
        <div
          ref={containerRef}
          className="h-64 p-4 border-2 border-dashed border-gray-300 rounded-lg overflow-auto bg-gradient-to-br from-purple-50 to-pink-50"
        >
          <div className="w-[150%] h-[300%] bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6 rounded">
            <div className="space-y-4">
              <h5 className="font-medium">Scroll me in any direction!</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white rounded shadow">
                  <strong>Vertical Scrolling:</strong>
                  <br />
                  ↑ Scroll up
                  <br />
                  ↓ Scroll down
                </div>
                <div className="p-3 bg-white rounded shadow">
                  <strong>Horizontal Scrolling:</strong>
                  <br />
                  ← Scroll left
                  <br />
                  → Scroll right
                </div>
              </div>

              <div className="space-y-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={`content-${i}`} className="p-2 bg-white rounded shadow text-sm">
                    Content block
                    {' '}
                    {i + 1}
                    {' '}
                    - This container has both horizontal and vertical scrolling enabled.
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={`wide-${i}`} className="p-2 bg-white rounded shadow text-sm whitespace-nowrap">
                    Wide content
                    {' '}
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white rounded shadow">
                <strong>Tips:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Direction detection works for both axes</li>
                  <li>• Includes configurable delay before reset</li>
                  <li>• Works with any scrollable element</li>
                  <li>• Returns null when scrolling stops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 bg-blue-100 rounded">
          <div className="font-medium">Up ⬆️</div>
          <div>Scroll toward top</div>
        </div>
        <div className="p-2 bg-green-100 rounded">
          <div className="font-medium">Down ⬇️</div>
          <div>Scroll toward bottom</div>
        </div>
        <div className="p-2 bg-yellow-100 rounded">
          <div className="font-medium">Left ⬅️</div>
          <div>Scroll toward left</div>
        </div>
        <div className="p-2 bg-purple-100 rounded">
          <div className="font-medium">Right ➡️</div>
          <div>Scroll toward right</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Direction resets to null after 300ms of no scrolling in the container (500ms for global scroll).
      </div>
    </div>
  )
}
