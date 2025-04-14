'use client'

import * as React from 'react'

export function useMediaQuery(
  query: string,
  initialValue?: boolean,
) {
  const [matches, setMatches] = React.useState(initialValue ?? false)
  const queryRef = React.useRef<MediaQueryList | null>(null)

  React.useEffect(() => {
    queryRef.current = window.matchMedia(query)

    setMatches(queryRef.current.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    queryRef.current.addEventListener('change', handleChange)

    return () => {
      queryRef.current?.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
