'use client'

import * as React from 'react'

const isBrowser = typeof window !== 'undefined'

export function useIsWindowScrolled(
  { threshold = 10 }: { threshold?: number } = {},
) {
  const scrollTop = isBrowser ? window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0 : 0
  const scrollLeft = isBrowser ? window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0 : 0

  const [isScrolled, setIsScrolled] = React.useState(scrollTop > threshold || scrollLeft > threshold)

  const handleScrollEvent = React.useEffectEvent(() => {
    setIsScrolled(scrollTop > threshold || scrollLeft > threshold)
  })

  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollEvent)
    }
  }, [threshold])

  return isScrolled
}
