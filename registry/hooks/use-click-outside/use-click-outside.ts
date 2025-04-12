import * as React from 'react'

export function useClickOutside<T extends Element = Element>(
  ref: React.RefObject<T> | React.RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  options?: { enabled?: boolean }
): void {
  const { enabled = true } = options ?? {}
  const handlerRef = React.useRef(handler)

  React.useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  React.useEffect(() => {
    if (!enabled) return

    const abortController = new AbortController()

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      const target = event.target as T
      const refs = Array.isArray(ref) ? ref : [ref]

      const isClickAway = refs.every(r => r.current && !r.current.contains(target))

      if (isClickAway) {
        handlerRef.current(event)
      }
    }

    document.addEventListener('mousedown', handleClickAway, { signal: abortController.signal })
    document.addEventListener('touchstart', handleClickAway, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }, [ref, enabled])
}
