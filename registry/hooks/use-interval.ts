'use client'

import * as React from 'react'

export function useInterval(
  callback: () => void,
  delay: number,
): void {
  const savedCallback = React.useRef<() => void>(callback)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
