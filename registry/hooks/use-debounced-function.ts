'use client'

import * as React from 'react'

export function useDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay = 0,
): (...args: Parameters<T>) => void {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedFn = React.useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  )

  React.useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  return debouncedFn
}
