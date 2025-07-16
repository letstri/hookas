'use client'

import * as React from 'react'

export function useIsInViewport(ref: React.RefObject<Element | null>, visibility: 'full' | 'partial' | number = 'partial') {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (!ref.current)
      return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: typeof visibility === 'number' ? visibility : visibility === 'full' ? 1 : 0,
      },
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, visibility])

  return isVisible
}
