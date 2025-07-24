'use client'

import { useRef } from 'react'
import { useIsScrolled } from '../../registry/hooks/use-is-scrolled'

export function IsScrolledDemo() {
  const verticalRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const bothRef = useRef<HTMLDivElement>(null)

  const isVerticalScrolled = useIsScrolled(verticalRef, { direction: 'vertical', side: 'top' })
  const isHorizontalScrolled = useIsScrolled(horizontalRef, { direction: 'horizontal', side: 'left' })
  const isBothScrolled = useIsScrolled(bothRef, { direction: 'both', side: 'top' })

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium flex items-center gap-2">
          📜 Scroll Detection Demo
        </h3>
        <p className="text-sm text-gray-600">
          Scroll in the boxes below to see real-time scroll detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vertical Scroll */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-blue-800">↕️ Vertical Scroll</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isVerticalScrolled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
            >
              {isVerticalScrolled ? '✅ Scrolled' : '❌ Not scrolled'}
            </span>
          </div>
          <div
            ref={verticalRef}
            className="h-32 w-full border border-blue-300 rounded bg-blue-50 overflow-y-auto p-3"
          >
            <div className="space-y-4">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={`vertical-${i}`} className="p-2 bg-white rounded border">
                  Content block
                  {' '}
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-green-800">↔️ Horizontal Scroll</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isHorizontalScrolled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
            >
              {isHorizontalScrolled ? '✅ Scrolled' : '❌ Not scrolled'}
            </span>
          </div>
          <div
            ref={horizontalRef}
            className="h-32 w-full border border-green-300 rounded bg-green-50 overflow-x-auto p-3"
          >
            <div className="flex gap-4 w-max">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={`horizontal-${i}`} className="flex-shrink-0 w-24 h-20 bg-white rounded border p-2 text-center text-xs">
                  Item
                  {' '}
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Both Directions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-purple-800">↗️ Both Directions</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isBothScrolled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
            >
              {isBothScrolled ? '✅ Scrolled' : '❌ Not scrolled'}
            </span>
          </div>
          <div
            ref={bothRef}
            className="h-32 w-full border border-purple-300 rounded bg-purple-50 overflow-auto p-3"
          >
            <div className="w-96 space-y-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={`both-${i}`} className="flex gap-2">
                  {Array.from({ length: 6 }, (_, j) => (
                    <div key={`both-${i}-${j}`} className="flex-shrink-0 w-16 h-12 bg-white rounded border p-1 text-xs text-center">
                      {i * 6 + j + 1}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded border">
        <h4 className="font-medium mb-2">📊 Scroll Status Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span>Vertical:</span>
            <span className={isVerticalScrolled ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {isVerticalScrolled ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Horizontal:</span>
            <span className={isHorizontalScrolled ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {isHorizontalScrolled ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Combined:</span>
            <span className={isBothScrolled ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {isBothScrolled ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        💡 The hook detects when elements are scrolled beyond a threshold (default: 10px) in the specified direction.
      </div>
    </div>
  )
}
