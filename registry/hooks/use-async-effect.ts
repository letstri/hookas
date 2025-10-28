'use client'

import type { DependencyList } from 'react'
import * as React from 'react'

export function useAsyncEffect(
  effect: () => Promise<void | (() => Promise<void> | void)>,
  deps: DependencyList = [],
) {
  const destroyRef = React.useRef<void | (() => Promise<void> | void) | undefined>(undefined)

  const effectEvent = React.useEffectEvent(effect)

  React.useEffect(() => {
    const e = effectEvent()

    async function execute() {
      destroyRef.current = await e
    }

    execute()

    return () => {
      if (typeof destroyRef.current === 'function')
        destroyRef.current()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
