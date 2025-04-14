import { useDeferredValue, useState } from 'react'

export function useDeferredState<T>(initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue)
  const deferredValue = useDeferredValue(value)

  return [deferredValue, setValue] as const
}
