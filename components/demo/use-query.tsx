'use client'

import { useState } from 'react'
import { useQuery } from '../../registry/hooks/use-query'

// Mock API functions
function fetchUsers() {
  return new Promise<Array<{ id: number, name: string, email: string }>>((resolve) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        throw new Error('Failed to fetch users')
      }
      resolve([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
      ])
    }, 1000)
  })
}

function fetchPosts() {
  return new Promise<Array<{ id: number, title: string, content: string }>>((resolve) => {
    setTimeout(() => {
      if (Math.random() > 0.7) {
        throw new Error('Posts API is down')
      }
      resolve([
        { id: 1, title: 'First Post', content: 'This is the first post content' },
        { id: 2, title: 'Second Post', content: 'This is the second post content' },
      ])
    }, 1500)
  })
}

export function QueryDemo() {
  const [activeQuery, setActiveQuery] = useState<'users' | 'posts' | null>(null)

  const usersQuery = useQuery(() => fetchUsers())
  const postsQuery = useQuery(() => fetchPosts())

  const handleFetchUsers = () => {
    setActiveQuery('users')
    usersQuery.refetch()
  }

  const handleFetchPosts = () => {
    setActiveQuery('posts')
    postsQuery.refetch()
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Query Hook Demo</h3>
        <p className="text-sm text-gray-600">
          Lightweight alternative to @tanstack/react-query for simple data fetching.
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleFetchUsers}
            disabled={usersQuery.status === 'loading'}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            type="button"
          >
            {usersQuery.status === 'loading' && activeQuery === 'users' ? 'Loading...' : 'Fetch Users'}
          </button>
          <button
            onClick={handleFetchPosts}
            disabled={postsQuery.status === 'loading'}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
            type="button"
          >
            {postsQuery.status === 'loading' && activeQuery === 'posts' ? 'Loading...' : 'Fetch Posts'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium text-blue-800">Users Query</h4>
          <div className="text-sm mt-2">
            <div>
              Status:
              <span className="font-mono">{usersQuery.status}</span>
            </div>
            {usersQuery.error && (
              <div className="text-red-600 mt-1">
                Error:
                {usersQuery.error.message}
              </div>
            )}
            {usersQuery.data && (
              <div className="mt-2">
                <div className="font-medium">
                  Users (
                  {usersQuery.data.length}
                  ):
                </div>
                <ul className="list-disc list-inside text-xs mt-1">
                  {usersQuery.data.map(user => (
                    <li key={user.id}>
                      {user.name}
                      {' '}
                      -
                      {' '}
                      {user.email}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-green-800">Posts Query</h4>
          <div className="text-sm mt-2">
            <div>
              Status:
              <span className="font-mono">{postsQuery.status}</span>
            </div>
            {postsQuery.error && (
              <div className="text-red-600 mt-1">
                Error:
                {postsQuery.error.message}
              </div>
            )}
            {postsQuery.data && (
              <div className="mt-2">
                <div className="font-medium">
                  Posts (
                  {postsQuery.data.length}
                  ):
                </div>
                <ul className="list-disc list-inside text-xs mt-1">
                  {postsQuery.data.map(post => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Queries have a 20% (users) and 30% (posts) chance of failing to demonstrate error handling.
      </div>
    </div>
  )
}
