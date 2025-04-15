'use client'

import * as React from 'react'

import { useDebouncedMemo } from './use-debounced-memo'

export function useDebouncedState<T>(initialValue: T, delay = 0): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(initialValue)
  const debouncedValue = useDebouncedMemo(() => value, [value], delay)

  return [debouncedValue, value, setValue]
}
