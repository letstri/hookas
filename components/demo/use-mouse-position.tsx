'use client'

import { useRef } from 'react'
import { useMousePosition } from '../../registry/hooks/use-mouse-position'

export function MousePositionDemo() {
  const boxRef = useRef<HTMLDivElement>(null)
  const globalPosition = useMousePosition()
  const localPosition = useMousePosition(boxRef.current || undefined)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Mouse Position Demo</h3>
        <p className="text-sm text-gray-600">
          Move your mouse around to see position tracking in different contexts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-blue-50">
          <h4 className="font-medium text-blue-800 mb-2">Global Position</h4>
          <div className="space-y-1 text-sm">
            <div>
              X:
              <span className="font-mono">
                {globalPosition.x}
                px
              </span>
            </div>
            <div>
              Y:
              <span className="font-mono">
                {globalPosition.y}
                px
              </span>
            </div>
            <div className="text-xs text-gray-600">Relative to the document</div>
          </div>
        </div>

        <div className="p-4 border rounded bg-green-50">
          <h4 className="font-medium text-green-800 mb-2">Local Position</h4>
          <div className="space-y-1 text-sm">
            <div>
              X:
              <span className="font-mono">
                {localPosition.x}
                px
              </span>
            </div>
            <div>
              Y:
              <span className="font-mono">
                {localPosition.y}
                px
              </span>
            </div>
            <div className="text-xs text-gray-600">Relative to the box below</div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={boxRef}
          className="relative h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            Hover and move your mouse in this area
          </div>

          {/* Crosshair for local position */}
          {localPosition.x > 0 && localPosition.y > 0 && (
            <>
              <div
                className="absolute w-px h-full bg-red-400 opacity-50"
                style={{ left: localPosition.x }}
              />
              <div
                className="absolute w-full h-px bg-red-400 opacity-50"
                style={{ top: localPosition.y }}
              />
              <div
                className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg"
                style={{ left: localPosition.x, top: localPosition.y }}
              />
            </>
          )}

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${(i + 1) * 12.5}%` }} />
            ))}
            {Array.from({ length: 4 }, (_, i) => (
              <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${(i + 1) * 25}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-yellow-100 rounded text-center">
          <div className="font-medium">Quadrant</div>
          <div>
            {localPosition.x < 128 ? 'Left' : 'Right'}
            {' '}
            {localPosition.y < 128 ? 'Top' : 'Bottom'}
          </div>
        </div>
        <div className="p-2 bg-blue-100 rounded text-center">
          <div className="font-medium">Distance</div>
          <div>
            {Math.round(Math.sqrt(localPosition.x ** 2 + localPosition.y ** 2))}
            px
          </div>
        </div>
        <div className="p-2 bg-green-100 rounded text-center">
          <div className="font-medium">Angle</div>
          <div>
            {Math.round(Math.atan2(localPosition.y, localPosition.x) * 180 / Math.PI)}
            °
          </div>
        </div>
        <div className="p-2 bg-purple-100 rounded text-center">
          <div className="font-medium">Speed</div>
          <div className="text-gray-600">Real-time</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Global position tracks mouse relative to the entire page, while local position tracks relative to the interactive box.
      </div>
    </div>
  )
}
