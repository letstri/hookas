'use client'

import * as React from 'react'

export type ScrollDirection = 'vertical' | 'horizontal' | 'both'
export type ScrollSide = 'top' | 'bottom' | 'left' | 'right'

export function useIsScrolled(
  ref: React.RefObject<Element | null>,
  {
    threshold = 10,
    initial = false,
    direction = 'both',
    side = 'top',
  }: { threshold?: number, initial?: boolean, direction?: ScrollDirection, side?: ScrollSide } = {},
) {
  const [isScrolled, setIsScrolled] = React.useState(initial)

  React.useEffect(() => {
    const element = ref.current

    if (!element)
      return

    const handleScroll = () => {
      const scrollTop = element.scrollTop
      const scrollLeft = element.scrollLeft
      const scrollHeight = element.scrollHeight
      const clientHeight = (element as HTMLElement).clientHeight
      const scrollWidth = element.scrollWidth
      const clientWidth = (element as HTMLElement).clientWidth

      let scrolled = false

      if (direction === 'vertical') {
        if (side === 'top') {
          scrolled = scrollTop > threshold
        }
        else if (side === 'bottom') {
          scrolled = scrollTop < scrollHeight - clientHeight - threshold
        }
        else {
          // fallback to top if invalid side for vertical
          scrolled = scrollTop > threshold
        }
      }
      else if (direction === 'horizontal') {
        if (side === 'left') {
          scrolled = scrollLeft > threshold
        }
        else if (side === 'right') {
          scrolled = scrollLeft < scrollWidth - clientWidth - threshold
        }
        else {
          // fallback to left if invalid side for horizontal
          scrolled = scrollLeft > threshold
        }
      }
      else {
        // both directions
        let verticalScrolled: boolean
        let horizontalScrolled: boolean

        if (side === 'top') {
          verticalScrolled = scrollTop > threshold
        }
        else if (side === 'bottom') {
          verticalScrolled = scrollTop < scrollHeight - clientHeight - threshold
        }
        else {
          verticalScrolled = scrollTop > threshold
        }

        if (side === 'left') {
          horizontalScrolled = scrollLeft > threshold
        }
        else if (side === 'right') {
          horizontalScrolled = scrollLeft < scrollWidth - clientWidth - threshold
        }
        else {
          horizontalScrolled = scrollLeft > threshold
        }

        scrolled = verticalScrolled || horizontalScrolled
      }

      setIsScrolled(scrolled)
    }

    handleScroll()

    element.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [ref, threshold, direction, side])

  return isScrolled
}
