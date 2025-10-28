'use client'

import * as React from 'react'

export function useTimeoutEffect(effect: React.EffectCallback, timeout: number, deps: React.DependencyList) {
  const effectEvent = React.useEffectEvent(effect)

  React.useEffect(() => {
    let destroy: ReturnType<React.EffectCallback> | undefined
    const timer = setTimeout(() => {
      destroy = effectEvent()
    }, timeout)

    return () => {
      clearTimeout(timer)
      if (destroy) {
        destroy()
      }
    }
  }, [
    timeout,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ])
}
