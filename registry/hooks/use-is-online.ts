import { useSyncExternalStore } from 'react'

export function useIsOnline() {
  const onlineSubscriber = (cb: () => void) => {
    window.addEventListener('online', cb)
    window.addEventListener('offline', cb)

    return () => {
      window.removeEventListener('online', cb)
      window.removeEventListener('offline', cb)
    }
  }

  const isOnline = useSyncExternalStore(onlineSubscriber, () => window.navigator.onLine)

  return isOnline
}
