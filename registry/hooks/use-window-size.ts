'use client'

import * as React from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const windowSizeSubscriber = React.useCallback((callback: () => void) => {
    const abortController = new AbortController()

    window.addEventListener('resize', callback, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }, [])

  const getSnapshot = React.useCallback(() => {
    return {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    }
  }, [])

  const getServerSnapshot = React.useCallback(() => {
    return {
      width: 0,
      height: 0,
    }
  }, [])

  const windowSize = React.useSyncExternalStore(
    windowSizeSubscriber,
    getSnapshot,
    getServerSnapshot,
  )

  return windowSize
}
