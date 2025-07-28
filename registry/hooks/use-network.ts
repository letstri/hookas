'use client'

import * as React from 'react'

// Extended Navigator type to include the connection property
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation
}

// NetworkInformation interface based on MDN docs
interface NetworkInformation extends EventTarget {
  downlink: number
  downlinkMax?: number
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  rtt: number
  saveData: boolean
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'
  addEventListener: (type: 'change', listener: () => void) => void
  removeEventListener: (type: 'change', listener: () => void) => void
}

export interface NetworkState {
  /**
   * The effective bandwidth estimate in megabits per second
   */
  downlink: number
  /**
   * The maximum downlink speed in megabits per second (experimental)
   */
  downlinkMax: number | undefined
  /**
   * The effective connection type: 'slow-2g', '2g', '3g', or '4g'
   */
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  /**
   * The estimated round-trip time in milliseconds
   */
  rtt: number
  /**
   * Whether the user has enabled data saver mode
   */
  saveData: boolean
  /**
   * The connection type (experimental)
   */
  type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown' | undefined
  /**
   * Whether the Network Information API is supported
   */
  isSupported: boolean
  /**
   * Whether the connection is considered slow (slow-2g or 2g)
   */
  isConnectionSlow: boolean
  /**
   * Whether the user is currently online
   */
  online: boolean
}

function getNetworkState(): NetworkState {
  if (typeof window === 'undefined') {
    // Server-side defaults
    return {
      downlink: 0,
      downlinkMax: undefined,
      effectiveType: '4g',
      rtt: 0,
      saveData: false,
      type: undefined,
      isSupported: false,
      isConnectionSlow: false,
      online: true,
    }
  }

  const nav = navigator as NavigatorWithConnection
  const connection = nav.connection

  if (!connection) {
    return {
      downlink: 0,
      downlinkMax: undefined,
      effectiveType: '4g',
      rtt: 0,
      saveData: false,
      type: undefined,
      isSupported: false,
      isConnectionSlow: false,
      online: window.navigator.onLine,
    }
  }

  const effectiveType = connection.effectiveType
  const isConnectionSlow = effectiveType === 'slow-2g' || effectiveType === '2g'

  return {
    downlink: connection.downlink,
    downlinkMax: connection.downlinkMax,
    effectiveType,
    rtt: connection.rtt,
    saveData: connection.saveData,
    type: connection.type,
    isSupported: true,
    isConnectionSlow,
    online: window.navigator.onLine,
  }
}

export function useNetwork(): NetworkState {
  const [networkState, setNetworkState] = React.useState<NetworkState>(getNetworkState)

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const nav = navigator as NavigatorWithConnection
    const connection = nav.connection

    const updateNetworkState = () => {
      setNetworkState(getNetworkState())
    }

    // Set initial state
    updateNetworkState()

    // Listen for connection changes (Network Information API)
    if (connection) {
      connection.addEventListener('change', updateNetworkState)
    }

    // Listen for online/offline events
    window.addEventListener('online', updateNetworkState)
    window.addEventListener('offline', updateNetworkState)

    return () => {
      if (connection) {
        connection.removeEventListener('change', updateNetworkState)
      }
      window.removeEventListener('online', updateNetworkState)
      window.removeEventListener('offline', updateNetworkState)
    }
  }, [])

  return networkState
}
