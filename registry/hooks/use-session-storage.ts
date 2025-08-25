'use client'

import * as React from 'react'

export function getSessionStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  const item = window.sessionStorage.getItem(key)

  if (item === null) {
    return defaultValue
  }

  try {
    return JSON.parse(item)
  }
  catch {
    return typeof defaultValue === 'string' ? item as T : defaultValue
  }
}

export function useSessionStorage<T>(key: string, initialValue: T | (() => T)) {
  const readValue = React.useCallback(() => {
    const initial = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue

    return getSessionStorageValue(key, initial)
  }, [key, initialValue])

  const [storedValue, setStoredValue] = React.useState<T>(readValue)

  const setValue = React.useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore
        = typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    }
    catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  React.useEffect(() => {
    setStoredValue(readValue())
  }, [key, readValue])

  React.useEffect(() => {
    const abortController = new AbortController()

    window.addEventListener('storage', () => {
      setStoredValue(readValue())
    }, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }, [readValue])

  return [storedValue, setValue] as const
}
