'use client'

import * as React from 'react'

export function useIsMounted() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useLayoutEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}
