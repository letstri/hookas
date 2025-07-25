'use client'

import { useState } from 'react'
import { useIsWindowScrolled } from '../../registry/hooks/use-is-window-scrolled'

export function IsWindowScrolledDemo() {
  const [threshold, setThreshold] = useState(10)
  const isScrolled = useIsWindowScrolled({ threshold })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium flex items-center gap-2">
          🪟 Window Scroll Detection Demo
        </h3>
        <p className="text-sm text-gray-600">
          This hook detects if the entire window has been scrolled beyond a threshold.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${
            isScrolled
              ? 'border-green-300 bg-green-50 shadow-md'
              : 'border-gray-300 bg-gray-50'
          }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">
                {isScrolled ? '📍' : '🏠'}
              </div>
              <div className="text-lg font-medium mb-2">
                Window Scroll Status
              </div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                isScrolled
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
              >
                {isScrolled ? '✅ Window is scrolled' : '❌ At top of page'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Scroll Threshold:
                {' '}
                {threshold}
                px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={e => setThreshold(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0px</span>
                <span>50px</span>
                <span>100px</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded border">
            <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
              🎮 Scroll Controls
            </h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                ⬆️ Scroll to Top
              </button>
              <button
                type="button"
                onClick={scrollToBottom}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                ⬇️ Scroll to Bottom
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded border">
            <h4 className="font-medium text-purple-800 mb-3">📊 Scroll Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current threshold:</span>
                <span className="font-mono">
                  {threshold}
                  px
                </span>
              </div>
              <div className="flex justify-between">
                <span>Scroll position:</span>
                <span className="font-mono">
                  {typeof window !== 'undefined' ? Math.round(window.scrollY || 0) : 0}
                  px
                </span>
              </div>
              <div className="flex justify-between">
                <span>Page height:</span>
                <span className="font-mono">
                  {typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0}
                  px
                </span>
              </div>
              <div className="flex justify-between">
                <span>Viewport height:</span>
                <span className="font-mono">
                  {typeof window !== 'undefined' ? window.innerHeight : 0}
                  px
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
          💡 How it works
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Monitors window scroll position in real-time</li>
          <li>• Returns true when scrolled beyond the threshold</li>
          <li>• Useful for showing/hiding navigation bars or scroll-to-top buttons</li>
          <li>• Automatically handles both vertical and horizontal scrolling</li>
        </ul>
      </div>

      {/* Demo spacer content */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-center">📜 Demo Content Below</h4>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`demo-section-${i}`} className="p-6 bg-gray-50 rounded border">
            <h5 className="font-medium mb-3">
              Demo Section
              {i + 1}
            </h5>
            <p className="text-gray-600 mb-4">
              This is demo content to demonstrate window scrolling detection.
              Scroll up and down to see how the scroll status changes based on your threshold setting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }, (_, j) => (
                <div key={`demo-card-${i}-${j}`} className="p-4 bg-white rounded border">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="text-sm">
                      Content Block
                      {j + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center">
        💡 Scroll this page to see the window scroll detection in action!
      </div>
    </div>
  )
}
