'use client'

import * as React from 'react'
import { useIsomorphicEffect } from './use-isomorphic-effect'

export function useIsMounted() {
  const [isMounted, setIsMounted] = React.useState(false)

  useIsomorphicEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  return isMounted
}
