'use client'

import { useState } from 'react'
import { usePromise } from '../../registry/hooks/use-promise'

// Mock API functions
function fetchUserData() {
  return new Promise<{ name: string, email: string }>(resolve =>
    setTimeout(() => resolve({ name: 'John Doe', email: 'john@example.com' }), 1000),
  )
}

function fetchPosts() {
  return new Promise<string[]>(resolve =>
    setTimeout(() => resolve(['Post 1', 'Post 2', 'Post 3']), 1500),
  )
}

function fetchSlowData() {
  return new Promise<number>(resolve =>
    setTimeout(() => resolve(Math.floor(Math.random() * 1000)), 3000),
  )
}

export function PromiseDemo() {
  const [refetchKey, setRefetchKey] = useState(0)

  // Using usePromise with different promises
  const userData = usePromise(() => fetchUserData(), { name: 'Loading...', email: '' })
  const posts = usePromise(() => fetchPosts(), [])
  const randomNumber = usePromise(() => fetchSlowData())

  const refetch = () => {
    setRefetchKey(prev => prev + 1)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Promise Hook Demo</h3>
        <p className="text-sm text-gray-600">
          usePromise automatically handles promises and provides the resolved data.
        </p>

        <button
          onClick={refetch}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
          type="button"
        >
          Refetch Data (Key:
          {' '}
          {refetchKey}
          )
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium text-blue-800">User Data (1s delay)</h4>
          <div className="text-sm mt-2">
            <div>
              Name:
              {userData?.name}
            </div>
            <div>
              Email:
              {userData?.email}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Default: Loading...
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-green-800">Posts (1.5s delay)</h4>
          <div className="text-sm mt-2">
            {posts.length > 0
              ? (
                  <ul className="list-disc list-inside">
                    {posts.map(post => (
                      <li key={post}>{post}</li>
                    ))}
                  </ul>
                )
              : (
                  <div>Loading posts...</div>
                )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Default: []
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-purple-800">Random Number (3s delay)</h4>
          <div className="text-sm mt-2">
            {randomNumber !== undefined
              ? (
                  <div className="font-mono text-lg">{randomNumber}</div>
                )
              : (
                  <div>Loading...</div>
                )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            No default (undefined)
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        usePromise handles promise resolution automatically. You can provide default values
        or let it start as undefined.
      </div>
    </div>
  )
}
