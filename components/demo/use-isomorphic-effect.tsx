'use client'

import React, { useState } from 'react'
import { useIsomorphicEffect } from '../../registry/hooks/use-isomorphic-effect'

export function IsomorphicEffectDemo() {
  const [serverTime, setServerTime] = useState('')
  const [clientTime, setClientTime] = useState('')
  const [isClient, setIsClient] = useState(false)

  // This effect runs on both server and client appropriately
  useIsomorphicEffect(() => {
    const now = new Date().toLocaleTimeString()
    setServerTime(now)
    setIsClient(typeof window !== 'undefined')
  }, [])

  // Regular useEffect only runs on client
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setClientTime(new Date().toLocaleTimeString())
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Isomorphic Effect Demo</h3>
        <p className="text-sm text-gray-600">
          useIsomorphicEffect uses useLayoutEffect on client and useEffect on server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded bg-blue-50">
          <h4 className="font-medium text-blue-800">Environment</h4>
          <p className="text-sm text-blue-600">
            {isClient ? '🌐 Client-side' : '🖥️ Server-side'}
          </p>
        </div>

        <div className="p-3 border rounded bg-green-50">
          <h4 className="font-medium text-green-800">Isomorphic Effect Time</h4>
          <p className="text-sm text-green-600 font-mono">
            {serverTime || 'Not set'}
          </p>
        </div>

        <div className="p-3 border rounded bg-purple-50">
          <h4 className="font-medium text-purple-800">Client Effect Time</h4>
          <p className="text-sm text-purple-600 font-mono">
            {clientTime || 'Not set'}
          </p>
        </div>

        <div className="p-3 border rounded bg-gray-50">
          <h4 className="font-medium text-gray-800">Effect Type</h4>
          <p className="text-sm text-gray-600">
            {isClient ? 'useLayoutEffect' : 'useEffect'}
          </p>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        On the server, this uses useEffect. On the client, it uses useLayoutEffect for better performance.
      </div>
    </div>
  )
}
