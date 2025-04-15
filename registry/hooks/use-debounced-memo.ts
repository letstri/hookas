'use client'

import * as React from 'react'

export function useDebouncedMemo<T>(factory: () => T, deps: React.DependencyList, delay = 0): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(() => factory())
  const value = React.useMemo(() => factory(), deps)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
