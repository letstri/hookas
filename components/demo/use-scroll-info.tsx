'use client'

import { useRef } from 'react'
import { useScrollInfo } from '../../registry/hooks/use-scroll-info'

export function ScrollInfoDemo() {
  const verticalRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const verticalInfo = useScrollInfo(verticalRef)
  const horizontalInfo = useScrollInfo(horizontalRef)
  const gridInfo = useScrollInfo(gridRef)

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium flex items-center gap-2">
          📊 Scroll Information Demo
        </h3>
        <p className="text-sm text-gray-600">
          Get detailed scroll position information including remaining scroll distances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vertical Scroll Demo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-blue-800">↕️ Vertical Scroll</h4>
          </div>

          <div
            ref={verticalRef}
            className="h-40 border border-blue-300 rounded bg-blue-50 overflow-y-auto p-3"
          >
            <div className="space-y-3">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={`v-item-${i}`} className="p-3 bg-white rounded border text-center">
                  Item
                  {' '}
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-100 rounded text-sm space-y-1">
            <div className="font-medium text-blue-800 mb-2">📍 Scroll Position</div>
            <div className="flex justify-between">
              <span>Top:</span>
              <span className="font-mono">
                {verticalInfo.top}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bottom remaining:</span>
              <span className="font-mono">
                {verticalInfo.bottom}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Left:</span>
              <span className="font-mono">
                {verticalInfo.left}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Right remaining:</span>
              <span className="font-mono">
                {verticalInfo.right}
                px
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Demo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-green-800">↔️ Horizontal Scroll</h4>
          </div>

          <div
            ref={horizontalRef}
            className="h-40 border border-green-300 rounded bg-green-50 overflow-x-auto p-3"
          >
            <div className="flex gap-3 w-max">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={`h-item-${i}`} className="flex-shrink-0 w-20 h-28 bg-white rounded border p-2 text-center text-xs flex items-center justify-center">
                  Card
                  {' '}
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-100 rounded text-sm space-y-1">
            <div className="font-medium text-green-800 mb-2">📍 Scroll Position</div>
            <div className="flex justify-between">
              <span>Top:</span>
              <span className="font-mono">
                {horizontalInfo.top}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bottom remaining:</span>
              <span className="font-mono">
                {horizontalInfo.bottom}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Left:</span>
              <span className="font-mono">
                {horizontalInfo.left}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Right remaining:</span>
              <span className="font-mono">
                {horizontalInfo.right}
                px
              </span>
            </div>
          </div>
        </div>

        {/* 2D Scroll Demo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-purple-800">↗️ 2D Scroll</h4>
          </div>

          <div
            ref={gridRef}
            className="h-40 border border-purple-300 rounded bg-purple-50 overflow-auto p-3"
          >
            <div className="w-96 space-y-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={`grid-row-${i}`} className="flex gap-2">
                  {Array.from({ length: 8 }, (_, j) => (
                    <div key={`grid-item-${i}-${j}`} className="flex-shrink-0 w-12 h-12 bg-white rounded border text-xs flex items-center justify-center">
                      {i * 8 + j + 1}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-purple-100 rounded text-sm space-y-1">
            <div className="font-medium text-purple-800 mb-2">📍 Scroll Position</div>
            <div className="flex justify-between">
              <span>Top:</span>
              <span className="font-mono">
                {gridInfo.top}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bottom remaining:</span>
              <span className="font-mono">
                {gridInfo.bottom}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Left:</span>
              <span className="font-mono">
                {gridInfo.left}
                px
              </span>
            </div>
            <div className="flex justify-between">
              <span>Right remaining:</span>
              <span className="font-mono">
                {gridInfo.right}
                px
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded border">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            📏 Scroll Progress
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Vertical</span>
                <span>
                  {Math.round((verticalInfo.top / Math.max(1, verticalInfo.top + verticalInfo.bottom)) * 100)}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                  style={{
                    width: `${(verticalInfo.top / Math.max(1, verticalInfo.top + verticalInfo.bottom)) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Horizontal</span>
                <span>
                  {Math.round((horizontalInfo.left / Math.max(1, horizontalInfo.left + horizontalInfo.right)) * 100)}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-200"
                  style={{
                    width: `${(horizontalInfo.left / Math.max(1, horizontalInfo.left + horizontalInfo.right)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded border">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            🎯 Scroll Status
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${verticalInfo.top === 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>At top</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${verticalInfo.bottom === 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>At bottom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${horizontalInfo.left === 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>At left</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${horizontalInfo.right === 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>At right</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
            💡 Use Cases
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Infinite scrolling</li>
            <li>• Progress indicators</li>
            <li>• Load more content</li>
            <li>• Scroll-based animations</li>
            <li>• Position-aware UI</li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        💡 Returns scroll distances in all directions: top (scrolled from top), bottom (remaining to scroll), left (scrolled from left), right (remaining to scroll).
      </div>
    </div>
  )
}
