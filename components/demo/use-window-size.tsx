'use client'

import { useEffect, useState } from 'react'
import { useWindowSize } from '../../registry/hooks/use-window-size'

export function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  const [sizeHistory, setSizeHistory] = useState<Array<{ width: number, height: number, timestamp: string }>>([])

  useEffect(() => {
    setSizeHistory((prev) => {
      const newEntry = { width, height, timestamp: new Date().toLocaleTimeString() }
      return [newEntry, ...prev.slice(0, 4)]
    })
  }, [width, height])

  const getDeviceCategory = () => {
    if (width < 640)
      return 'Mobile'
    if (width < 768)
      return 'Small Mobile'
    if (width < 1024)
      return 'Tablet'
    if (width < 1280)
      return 'Desktop'
    if (width < 1536)
      return 'Large Desktop'
    return 'Ultra Wide'
  }

  const getOrientation = () => {
    return width > height ? 'Landscape' : 'Portrait'
  }

  const getAspectRatio = () => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
    const divisor = gcd(width, height)
    return `${width / divisor}:${height / divisor}`
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Window Size Demo</h3>
        <p className="text-sm text-gray-600">
          Resize your browser window to see real-time size updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded bg-blue-50">
          <h4 className="font-medium text-blue-800 mb-2">Current Size</h4>
          <div className="space-y-1 text-sm">
            <div className="text-2xl font-mono">
              {width}
              {' '}
              ×
              {' '}
              {height}
            </div>
            <div>
              Width:
              <span className="font-mono">
                {width}
                px
              </span>
            </div>
            <div>
              Height:
              <span className="font-mono">
                {height}
                px
              </span>
            </div>
            <div>
              Area:
              <span className="font-mono">
                {(width * height).toLocaleString()}
                px²
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded bg-green-50">
          <h4 className="font-medium text-green-800 mb-2">Device Info</h4>
          <div className="space-y-1 text-sm">
            <div>
              Category:
              <span className="font-medium">{getDeviceCategory()}</span>
            </div>
            <div>
              Orientation:
              <span className="font-medium">{getOrientation()}</span>
            </div>
            <div>
              Aspect Ratio:
              <span className="font-mono">{getAspectRatio()}</span>
            </div>
            <div>
              Diagonal:
              <span className="font-mono">
                {Math.round(Math.sqrt(width ** 2 + height ** 2))}
                px
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded bg-purple-50">
          <h4 className="font-medium text-purple-800 mb-2">Breakpoints</h4>
          <div className="space-y-1 text-xs">
            <div className={`${width >= 640 ? 'text-green-600' : 'text-gray-400'}`}>
              {width >= 640 ? '✅' : '❌'}
              {' '}
              sm (≥640px)
            </div>
            <div className={`${width >= 768 ? 'text-green-600' : 'text-gray-400'}`}>
              {width >= 768 ? '✅' : '❌'}
              {' '}
              md (≥768px)
            </div>
            <div className={`${width >= 1024 ? 'text-green-600' : 'text-gray-400'}`}>
              {width >= 1024 ? '✅' : '❌'}
              {' '}
              lg (≥1024px)
            </div>
            <div className={`${width >= 1280 ? 'text-green-600' : 'text-gray-400'}`}>
              {width >= 1280 ? '✅' : '❌'}
              {' '}
              xl (≥1280px)
            </div>
            <div className={`${width >= 1536 ? 'text-green-600' : 'text-gray-400'}`}>
              {width >= 1536 ? '✅' : '❌'}
              {' '}
              2xl (≥1536px)
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border rounded bg-gray-50">
        <h4 className="font-medium mb-2">Size History</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {sizeHistory.length > 0
            ? (
                sizeHistory.map(size => (
                  <div key={`${size.width}-${size.height}-${size.timestamp}`} className="text-sm text-gray-600 flex justify-between">
                    <span className="font-mono">
                      {size.width}
                      {' '}
                      ×
                      {' '}
                      {size.height}
                    </span>
                    <span>{size.timestamp}</span>
                  </div>
                ))
              )
            : (
                <div className="text-sm text-gray-500">No size changes yet</div>
              )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        <div className="p-2 bg-red-100 rounded text-sm">
          <div className="font-medium">Mobile</div>
          <div className="text-xs">&lt; 640px</div>
        </div>
        <div className="p-2 bg-yellow-100 rounded text-sm">
          <div className="font-medium">Tablet</div>
          <div className="text-xs">640-1024px</div>
        </div>
        <div className="p-2 bg-green-100 rounded text-sm">
          <div className="font-medium">Desktop</div>
          <div className="text-xs">1024-1280px</div>
        </div>
        <div className="p-2 bg-blue-100 rounded text-sm">
          <div className="font-medium">Large</div>
          <div className="text-xs">&gt; 1280px</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Window size updates automatically when you resize the browser window.
      </div>
    </div>
  )
}
