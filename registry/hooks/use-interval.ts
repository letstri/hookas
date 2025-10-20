'use client'

import * as React from 'react'

export function useInterval(
  callback: () => void,
  delay: number,
): void {
  const callbackEvent = React.useEffectEvent(callback)

  React.useEffect(() => {
    const id = setInterval(callbackEvent, delay)
    return () => clearInterval(id)
  }, [delay])
}
