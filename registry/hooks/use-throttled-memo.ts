'use client'

import * as React from 'react'
import { useThrottledCallback } from './use-throttled-callback'

export function useThrottledMemo<T>(factory: () => T, deps: React.DependencyList, delay: number) {
  const [state, setState] = React.useState<T>(() => factory())

  const throttledSetState = useThrottledCallback((value: T) => {
    setState(value)
  }, [setState], delay)

  React.useEffect(() => {
    throttledSetState(factory())
  }, [...deps, throttledSetState])

  return state
}
