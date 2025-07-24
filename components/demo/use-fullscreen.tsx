'use client'

import { useRef, useState } from 'react'
import { useFullscreen } from '../../registry/hooks/use-fullscreen'

export function FullscreenDemo() {
  const videoRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [fullscreenEvents, setFullscreenEvents] = useState<string[]>([])

  const documentFullscreen = useFullscreen({
    onFullscreenChange: (isFullscreen) => {
      setFullscreenEvents(prev => [
        `Document fullscreen: ${isFullscreen ? 'entered' : 'exited'} at ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 4),
      ])
    },
  })

  const videoFullscreen = useFullscreen({
    element: videoRef as React.RefObject<HTMLElement>,
    onFullscreenChange: (isFullscreen) => {
      setFullscreenEvents(prev => [
        `Video container fullscreen: ${isFullscreen ? 'entered' : 'exited'} at ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 4),
      ])
    },
  })

  const imageFullscreen = useFullscreen({
    element: imageRef as React.RefObject<HTMLElement>,
    onFullscreenChange: (isFullscreen) => {
      setFullscreenEvents(prev => [
        `Image container fullscreen: ${isFullscreen ? 'entered' : 'exited'} at ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 4),
      ])
    },
  })

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Fullscreen Demo</h3>
        <p className="text-sm text-gray-600">
          Control fullscreen mode for the entire document or specific elements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium text-blue-800">Document Fullscreen</h4>
          <div className="flex flex-col gap-2 mt-2">
            <div className="text-sm">
              Status:
              {' '}
              {documentFullscreen.isFullscreen ? '🔳 Fullscreen' : '🔲 Normal'}
            </div>
            <button
              onClick={documentFullscreen.toggleFullscreen}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              type="button"
            >
              {documentFullscreen.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
            <button
              onClick={documentFullscreen.enterFullscreen}
              disabled={documentFullscreen.isFullscreen}
              className="px-3 py-1 bg-blue-300 text-white rounded hover:bg-blue-400 disabled:bg-gray-300 text-sm"
              type="button"
            >
              Enter
            </button>
            <button
              onClick={documentFullscreen.exitFullscreen}
              disabled={!documentFullscreen.isFullscreen}
              className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 disabled:bg-gray-300 text-sm"
              type="button"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-green-800">Video Container</h4>
          <div
            ref={videoRef}
            className="w-full h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded mb-2 flex items-center justify-center text-white text-sm"
          >
            📹 Video Content
            {videoFullscreen.isFullscreen && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                Fullscreen Video Mode
              </div>
            )}
          </div>
          <div className="text-sm mb-2">
            Status:
            {' '}
            {videoFullscreen.isFullscreen ? '🔳 Fullscreen' : '🔲 Normal'}
          </div>
          <button
            onClick={videoFullscreen.toggleFullscreen}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm w-full"
            type="button"
          >
            Toggle Video Fullscreen
          </button>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-purple-800">Image Container</h4>
          <div
            ref={imageRef}
            className="w-full h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded mb-2 flex items-center justify-center text-white text-sm"
          >
            🖼️ Image Content
            {imageFullscreen.isFullscreen && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                Fullscreen Image Mode
              </div>
            )}
          </div>
          <div className="text-sm mb-2">
            Status:
            {' '}
            {imageFullscreen.isFullscreen ? '🔳 Fullscreen' : '🔲 Normal'}
          </div>
          <button
            onClick={imageFullscreen.toggleFullscreen}
            className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm w-full"
            type="button"
          >
            Toggle Image Fullscreen
          </button>
        </div>
      </div>

      <div className="p-3 border rounded bg-gray-50">
        <h4 className="font-medium">Fullscreen Events Log</h4>
        <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
          {fullscreenEvents.length > 0
            ? (
                fullscreenEvents.map(event => (
                  <div key={event} className="text-sm text-gray-600">
                    {event}
                  </div>
                ))
              )
            : (
                <div className="text-sm text-gray-500">No fullscreen events yet</div>
              )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Press ESC key to exit fullscreen mode. Some browsers may show permission prompts.
      </div>
    </div>
  )
}
