'use client'

import { useRef, useState } from 'react'
import { useClickOutside } from '../../registry/hooks/use-click-outside'

export function ClickOutsideDemo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickedOutside, setLastClickedOutside] = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef as React.RefObject<Element>, () => {
    setIsDropdownOpen(false)
    setClickCount(prev => prev + 1)
    setLastClickedOutside(`Dropdown at ${new Date().toLocaleTimeString()}`)
  })

  useClickOutside(modalRef as React.RefObject<Element>, () => {
    setIsModalOpen(false)
    setClickCount(prev => prev + 1)
    setLastClickedOutside(`Modal at ${new Date().toLocaleTimeString()}`)
  })

  useClickOutside(tooltipRef as React.RefObject<Element>, () => {
    setIsTooltipOpen(false)
    setClickCount(prev => prev + 1)
    setLastClickedOutside(`Tooltip at ${new Date().toLocaleTimeString()}`)
  })

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Click Outside Demo</h3>
        <p className="text-sm text-gray-600">
          Click outside any of the open components to close them automatically.
        </p>

        <div className="flex items-center gap-4 text-sm">
          <div>
            Total outside clicks:
            <span className="font-mono">{clickCount}</span>
          </div>
          <div>
            Last closed:
            <span className="text-blue-600">{lastClickedOutside || 'None'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dropdown Demo */}
        <div className="relative">
          <h4 className="font-medium text-blue-800 mb-2">Dropdown Menu</h4>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            type="button"
          >
            {isDropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            >
              <div className="p-3">
                <div className="space-y-2">
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded" type="button">
                    Profile
                  </button>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded" type="button">
                    Settings
                  </button>
                  <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded" type="button">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tooltip Demo */}
        <div className="relative">
          <h4 className="font-medium text-green-800 mb-2">Tooltip</h4>
          <button
            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
            type="button"
          >
            {isTooltipOpen ? 'Hide Tooltip' : 'Show Tooltip'}
          </button>

          {isTooltipOpen && (
            <div
              ref={tooltipRef}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm rounded px-3 py-2 z-10"
            >
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              This is a tooltip that closes when clicking outside
            </div>
          )}
        </div>

        {/* Modal Trigger */}
        <div>
          <h4 className="font-medium text-purple-800 mb-2">Modal</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 w-full"
            type="button"
          >
            Open Modal
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-medium mb-4">Modal Title</h3>
            <p className="text-gray-600 mb-4">
              This modal will close when you click outside of it. Try clicking on the backdrop!
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                type="button"
              >
                Close Modal
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                type="button"
              >
                Another Action
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        useClickOutside automatically handles mouse and touch events. Perfect for dropdowns, modals, and tooltips.
      </div>
    </div>
  )
}
