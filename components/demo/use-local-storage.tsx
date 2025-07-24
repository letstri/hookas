'use client'

import { useState } from 'react'
import { useLocalStorage } from '../../registry/hooks/use-local-storage'

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '')
  const [age, setAge] = useLocalStorage('demo-age', 0)
  const [preferences, setPreferences] = useLocalStorage('demo-preferences', {
    theme: 'light',
    notifications: true,
    language: 'en',
  })
  const [todos, setTodos] = useLocalStorage<string[]>('demo-todos', [])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, newTodo.trim()])
      setNewTodo('')
    }
  }

  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }))
  }

  const clearAll = () => {
    setName('')
    setAge(0)
    setPreferences({ theme: 'light', notifications: true, language: 'en' })
    setTodos([])
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Local Storage Demo</h3>
        <p className="text-sm text-gray-600">
          Data persists across browser sessions. Try refreshing the page!
        </p>

        <button
          onClick={clearAll}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
          type="button"
        >
          Clear All Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium">User Info</h4>
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
            <input
              type="number"
              placeholder="Enter your age"
              value={age || ''}
              onChange={e => setAge(Number(e.target.value) || 0)}
              className="px-2 py-1 border rounded text-sm"
            />
            <div className="text-xs text-gray-600">
              Stored:
              {' '}
              {name || 'No name'}
              , Age:
              {' '}
              {age}
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium">Preferences</h4>
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={toggleTheme}
              className={`px-2 py-1 rounded text-sm ${
                preferences.theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              type="button"
            >
              Theme:
              {' '}
              {preferences.theme}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={e => setPreferences(prev => ({
                  ...prev,
                  notifications: e.target.checked,
                }))}
              />
              Notifications
            </label>
            <select
              value={preferences.language}
              onChange={e => setPreferences(prev => ({
                ...prev,
                language: e.target.value,
              }))}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        <div className="p-3 border rounded md:col-span-2">
          <h4 className="font-medium">Todo List</h4>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a todo"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              className="flex-1 px-2 py-1 border rounded text-sm"
            />
            <button
              onClick={addTodo}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              type="button"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {todos.map(todo => (
              <li key={todo} className="flex items-center justify-between text-sm">
                <span>{todo}</span>
                <button
                  onClick={() => removeTodo(todos.indexOf(todo))}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && (
            <div className="text-gray-500 text-sm mt-2">No todos yet</div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        All data is automatically saved to localStorage and will persist across browser sessions.
      </div>
    </div>
  )
}
