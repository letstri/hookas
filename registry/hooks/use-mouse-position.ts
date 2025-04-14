'use client'

import * as React from 'react'

export function useMousePosition<T extends Element>(element?: T) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const targetElement = element ?? document
    const abortController = new AbortController()

    targetElement.addEventListener('mousemove', (event) => {
      const mouseEvent = event as MouseEvent
      const rect = (mouseEvent.currentTarget as HTMLElement)?.getBoundingClientRect()
      const x = Math.max(0, Math.round(mouseEvent.pageX - rect.left - window.scrollX))
      const y = Math.max(0, Math.round(mouseEvent.pageY - rect.top - window.scrollY))

      setPosition({ x, y })
    }, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }, [element])

  return position
}
