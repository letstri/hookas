'use client'

import * as React from 'react'

export function useIsScrolled(
  ref?: React.RefObject<Element | null> | Element,
  threshold = 10,
): boolean {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const element = ref ? 'current' in ref ? ref.current : ref : window.document.documentElement

    if (!element)
      return

    const handleScroll = () => {
      const scrollTop = element.scrollTop
      const scrollLeft = element.scrollLeft

      setIsScrolled(scrollTop > threshold || scrollLeft > threshold)
    }

    handleScroll()

    element.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [ref, threshold])

  return isScrolled
}

