'use client'

import { useRef, useState } from 'react'
import { useElementSize } from '../../registry/hooks/use-element-size'

export function ElementSizeDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  const containerSize = useElementSize(containerRef)
  const textareaSize = useElementSize(textareaRef)
  const boxSize = useElementSize(boxRef)

  const [boxDimensions, setBoxDimensions] = useState({ width: 200, height: 150 })
  const [text, setText] = useState('Resize this textarea to see size changes!')

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Element Size Demo</h3>
        <p className="text-sm text-gray-600">
          Track element dimensions in real-time using ResizeObserver.
        </p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-blue-800">Resizable Textarea</h4>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full h-24 p-2 border rounded resize"
              placeholder="This textarea is resizable..."
            />
            <div className="text-sm text-gray-600 mt-1">
              Size:
              {' '}
              {textareaSize.width}
              ×
              {textareaSize.height}
              px
            </div>
          </div>

          <div>
            <h4 className="font-medium text-green-800">Dynamic Box</h4>
            <div
              ref={boxRef}
              className="bg-green-100 border-2 border-green-300 rounded flex items-center justify-center"
              style={{
                width: boxDimensions.width,
                height: boxDimensions.height,
              }}
            >
              <div className="text-center text-sm">
                <div>
                  {boxSize.width}
                  ×
                  {boxSize.height}
                  px
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs">
                  Width:
                  {boxDimensions.width}
                  px
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={boxDimensions.width}
                  onChange={e => setBoxDimensions(prev => ({ ...prev, width: Number(e.target.value) }))}
                  className="w-24"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs">
                  Height:
                  {boxDimensions.height}
                  px
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={boxDimensions.height}
                  onChange={e => setBoxDimensions(prev => ({ ...prev, height: Number(e.target.value) }))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-purple-800">Size Information</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-50 rounded">
                <div className="font-medium">Container</div>
                <div>
                  Width:
                  {containerSize.width}
                  px
                </div>
                <div>
                  Height:
                  {containerSize.height}
                  px
                </div>
                <div>
                  Aspect:
                  {containerSize.width && containerSize.height
                    ? (containerSize.width / containerSize.height).toFixed(2)
                    : 'N/A'}
                </div>
              </div>

              <div className="p-2 bg-green-50 rounded">
                <div className="font-medium">Textarea</div>
                <div>
                  Width:
                  {textareaSize.width}
                  px
                </div>
                <div>
                  Height:
                  {textareaSize.height}
                  px
                </div>
                <div>
                  Area:
                  {textareaSize.width && textareaSize.height
                    ? (textareaSize.width * textareaSize.height).toLocaleString()
                    : 'N/A'}
                  px²
                </div>
              </div>

              <div className="p-2 bg-purple-50 rounded">
                <div className="font-medium">Dynamic Box</div>
                <div>
                  Width:
                  {boxSize.width}
                  px
                </div>
                <div>
                  Height:
                  {boxSize.height}
                  px
                </div>
                <div>
                  Perimeter:
                  {boxSize.width && boxSize.height
                    ? (2 * (boxSize.width + boxSize.height)).toLocaleString()
                    : 'N/A'}
                  px
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Element dimensions are tracked automatically using ResizeObserver and update in real-time.
      </div>
    </div>
  )
}
