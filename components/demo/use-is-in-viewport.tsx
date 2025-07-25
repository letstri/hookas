'use client'

import { useRef } from 'react'
import { useIsInViewport } from '../../registry/hooks/use-is-in-viewport'

export function IsInViewportDemo() {
  const partialRef = useRef<HTMLDivElement>(null)
  const fullRef = useRef<HTMLDivElement>(null)
  const customRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const isPartialVisible = useIsInViewport(partialRef, 'partial')
  const isFullVisible = useIsInViewport(fullRef, 'full')
  const isCustomVisible = useIsInViewport(customRef, 0.5)
  const isTargetVisible = useIsInViewport(targetRef, 'partial')

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium flex items-center gap-2">
          👁️ Viewport Detection Demo
        </h3>
        <p className="text-sm text-gray-600">
          Scroll down to see how different visibility thresholds work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-blue-800">👀 Partial Visibility</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isPartialVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            >
              {isPartialVisible ? '✅ Visible' : '❌ Hidden'}
            </span>
          </div>
          <div
            ref={partialRef}
            className={`h-32 w-full border-2 rounded p-4 transition-all duration-300 ${
              isPartialVisible
                ? 'border-green-300 bg-green-50 scale-105 shadow-md'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">👁️</div>
              <div className="text-sm font-medium">
                {isPartialVisible ? 'I can see you!' : 'Can\'t see me...'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-purple-800">🎯 Full Visibility</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isFullVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            >
              {isFullVisible ? '✅ Fully Visible' : '❌ Partially Hidden'}
            </span>
          </div>
          <div
            ref={fullRef}
            className={`h-32 w-full border-2 rounded p-4 transition-all duration-300 ${
              isFullVisible
                ? 'border-purple-300 bg-purple-50 scale-105 shadow-md'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-medium">
                {isFullVisible ? 'Completely visible!' : 'Need full view...'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-orange-800">📏 50% Threshold</h4>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              isCustomVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            >
              {isCustomVisible ? '✅ 50%+ Visible' : '❌ < 50% Visible'}
            </span>
          </div>
          <div
            ref={customRef}
            className={`h-32 w-full border-2 rounded p-4 transition-all duration-300 ${
              isCustomVisible
                ? 'border-orange-300 bg-orange-50 scale-105 shadow-md'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📏</div>
              <div className="text-sm font-medium">
                {isCustomVisible ? 'Half or more visible!' : 'Less than half...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to demonstrate scrolling */}
      <div className="h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded border flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📜</div>
          <div className="text-lg font-medium text-gray-700 mb-4">Scroll down for more</div>
          <button
            type="button"
            onClick={scrollToTarget}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Jump to Target Element
          </button>
        </div>
      </div>

      {/* Target element far down */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-green-800">🎪 Target Element</h4>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            isTargetVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
          >
            {isTargetVisible ? '✅ In View' : '❌ Out of View'}
          </span>
        </div>
        <div
          ref={targetRef}
          className={`h-40 w-full border-2 rounded p-6 transition-all duration-500 ${
            isTargetVisible
              ? 'border-green-300 bg-green-50 scale-105 shadow-lg'
              : 'border-gray-300 bg-gray-50'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🎪</div>
            <div className="text-lg font-medium mb-2">
              {isTargetVisible ? 'Welcome to the show!' : 'Hidden treasure...'}
            </div>
            <div className="text-sm text-gray-600">
              This element demonstrates viewport detection with smooth scrolling
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded border">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          📊 Visibility Status
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex justify-between">
            <span>Partial:</span>
            <span className={isPartialVisible ? 'text-green-600 font-medium' : 'text-red-600'}>
              {isPartialVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Full:</span>
            <span className={isFullVisible ? 'text-green-600 font-medium' : 'text-red-600'}>
              {isFullVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>50% Threshold:</span>
            <span className={isCustomVisible ? 'text-green-600 font-medium' : 'text-red-600'}>
              {isCustomVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Target:</span>
            <span className={isTargetVisible ? 'text-green-600 font-medium' : 'text-red-600'}>
              {isTargetVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        💡 Uses Intersection Observer API with different visibility thresholds: partial (0), full (1), and custom (0.5).
      </div>
    </div>
  )
}
