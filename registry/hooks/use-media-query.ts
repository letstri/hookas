'use client'

import * as React from 'react'

const isBrowser = typeof window !== 'undefined'

export function useMediaQuery(
  query: string,
) {
  const mediaQuery = React.useMemo(() => isBrowser ? window.matchMedia(query) : null, [query])

  const [matches, setMatches] = React.useState(mediaQuery?.matches ?? false)

  React.useEffect(() => {
    if (!mediaQuery)
      return

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [mediaQuery])

  return matches
}
