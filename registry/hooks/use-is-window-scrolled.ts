'use client'

import * as React from 'react'

export function useIsWindowScrolled(
  { threshold = 10, initial = false }: { threshold?: number, initial?: boolean } = {},
) {
  const [isScrolled, setIsScrolled] = React.useState(initial)

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      const scrollLeft = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0

      setIsScrolled(scrollTop > threshold || scrollLeft > threshold)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isScrolled
}
