'use client'

import * as React from 'react'

export function useIsOnline() {
  const onlineSubscriber = (cb: () => void) => {
    const abortController = new AbortController()

    window.addEventListener('online', cb, { signal: abortController.signal })
    window.addEventListener('offline', cb, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }

  const getSnapshot = React.useCallback(() => window.navigator.onLine, [])

  const getServerSnapshot = React.useCallback(() => true, [])

  const isOnline = React.useSyncExternalStore(
    onlineSubscriber,
    getSnapshot,
    getServerSnapshot,
  )

  return isOnline
}
