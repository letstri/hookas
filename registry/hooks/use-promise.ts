'use client'

import * as React from 'react'
import { useIsomorphicEffect } from './use-isomorphic-effect'

export function usePromise<T>(promise: Promise<T>): T | null
export function usePromise<T, D extends T>(promise: Promise<T>, initialData: D): T
export function usePromise<T, D extends T>(
  promise: Promise<T>,
  initialData?: D,
) {
  const [data, setData] = React.useState<T | null>(initialData || null)

  useIsomorphicEffect(() => {
    promise.then(setData)
  }, [])

  return data
}
