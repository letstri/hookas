'use client'

import { useState } from 'react'
import { useDebouncedCallback } from '../../registry/hooks/use-debounced-callback'

export function DebouncedCallbackDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [searchCount, setSearchCount] = useState(0)

  // Simulate an API search function
  const performSearch = useDebouncedCallback((term: string) => {
    setSearchCount(prev => prev + 1)
    // Simulate search results
    const results = term
      ? [
          `Result 1 for "${term}"`,
          `Result 2 for "${term}"`,
          `Result 3 for "${term}"`,
        ]
      : []
    setSearchResults(results)
  }, [setSearchResults, setSearchCount], 500)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    performSearch(value)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="search" className="text-sm font-medium">
          Search (debounced API calls):
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="font-medium">Search API calls made:</span>
          {' '}
          <span className="text-blue-600">{searchCount}</span>
        </div>
        <div>
          <span className="font-medium">Results:</span>
          {searchResults.length > 0
            ? (
                <ul className="mt-1 ml-4 list-disc text-gray-600">
                  {searchResults.map(result => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              )
            : (
                <span className="text-gray-500 ml-2">No results</span>
              )}
        </div>
      </div>
    </div>
  )
}
