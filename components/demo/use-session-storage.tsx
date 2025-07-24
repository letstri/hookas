'use client'

import { useState } from 'react'
import { useSessionStorage } from '../../registry/hooks/use-session-storage'

export function SessionStorageDemo() {
  const [formData, setFormData] = useSessionStorage('demo-form', {
    name: '',
    email: '',
    message: '',
  })
  const [cartItems, setCartItems] = useSessionStorage<Array<{ name: string, price: number }>>('demo-cart', [])
  const [newItem, setNewItem] = useState({ name: '', price: 0 })

  const updateFormField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addToCart = () => {
    if (newItem.name && newItem.price > 0) {
      setCartItems(prev => [...prev, newItem])
      setNewItem({ name: '', price: 0 })
    }
  }

  const removeFromCart = (itemName: string) => {
    setCartItems(prev => prev.filter(item => item.name !== itemName))
  }

  const clearSession = () => {
    setFormData({ name: '', email: '', message: '' })
    setCartItems([])
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Session Storage Demo</h3>
        <p className="text-sm text-gray-600">
          Data persists only for the current browser session (until tab is closed).
        </p>

        <button
          onClick={clearSession}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
          type="button"
        >
          Clear Session Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium">Contact Form</h4>
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => updateFormField('name', e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => updateFormField('email', e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={e => updateFormField('message', e.target.value)}
              className="px-2 py-1 border rounded text-sm resize-none"
              rows={3}
            />
            <div className="text-xs text-gray-600">
              Form data is automatically saved as you type
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium">Shopping Cart</h4>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Item name"
                value={newItem.name}
                onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price || ''}
                onChange={e => setNewItem(prev => ({ ...prev, price: Number(e.target.value) || 0 }))}
                className="w-20 px-2 py-1 border rounded text-sm"
              />
              <button
                onClick={addToCart}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                type="button"
              >
                Add
              </button>
            </div>

            <div className="space-y-1">
              {cartItems.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span>
                      $
                      {item.price}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-500 hover:text-red-700"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length === 0
              ? (
                  <div className="text-gray-500 text-sm">Cart is empty</div>
                )
              : (
                  <div className="border-t pt-2 font-medium text-sm">
                    Total: $
                    {totalPrice.toFixed(2)}
                  </div>
                )}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Session storage data is cleared when you close the browser tab, unlike localStorage which persists.
      </div>
    </div>
  )
}
