'use client'

import * as React from 'react'

interface UseQueryProps {
  fetcher: () => Promise<any>
  manual?: boolean
}

export function useQuery({ fetcher, manual = false }: UseQueryProps) {
  const [error, setError] = React.useState<Error | null>(null)
  const [data, setData] = React.useState<any>(null)
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const fetch = React.useCallback(async () => {
    setStatus('loading')
    try {
      const result = await fetcher()
      setData(result)
      setStatus('success')
    }
    catch (err) {
      setError(err as Error)
      setStatus('error')
    }
  }, [fetcher])

  const refetch = React.useCallback(() => {
    fetch()
  }, [fetch])

  React.useEffect(() => {
    if (!manual) {
      fetch()
    }
  }, [fetch, manual])

  return { data, error, status, refetch }
}
