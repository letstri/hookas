'use client'

import * as React from 'react'

export function useTimeoutEffect(effect: React.EffectCallback, timeout: number, deps: React.DependencyList) {
  React.useEffect(() => {
    let destroy: ReturnType<React.EffectCallback> | undefined
    const timer = setTimeout(() => {
      destroy = effect()
    }, timeout)

    return () => {
      clearTimeout(timer)
      if (destroy) {
        destroy()
      }
    }
  }, [
    effect,
    timeout,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ])
}
