'use client'

import * as React from 'react'

export function useDeferredState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>]
export function useDeferredState<S = undefined>(): [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>]
export function useDeferredState<S = undefined>(initialState?: S | (() => S)) {
  const [value, setValue] = React.useState<S>(initialState as S)
  const deferredValue = React.useDeferredValue(value)

  return [deferredValue, setValue] as const
}
