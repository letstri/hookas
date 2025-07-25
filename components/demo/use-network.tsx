'use client'

import { useNetwork } from '../../registry/hooks/use-network'

export function NetworkDemo() {
  const {
    effectiveType,
    downlink,
    rtt,
    saveData,
    isConnectionSlow,
    isSupported,
    type,
    online,
    downlinkMax,
  } = useNetwork()

  const getConnectionQualityColor = () => {
    if (!online)
      return 'bg-red-500'
    switch (effectiveType) {
      case 'slow-2g': return 'bg-red-500'
      case '2g': return 'bg-orange-500'
      case '3g': return 'bg-yellow-500'
      case '4g': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getConnectionIcon = () => {
    if (!online)
      return '📵'
    switch (effectiveType) {
      case 'slow-2g': return '📶'
      case '2g': return '📶'
      case '3g': return '📶'
      case '4g': return '📶'
      default: return '🌐'
    }
  }

  const getSpeedDescription = () => {
    if (!online)
      return 'Offline'
    if (isConnectionSlow)
      return 'Slow connection detected'
    if (downlink > 10)
      return 'Very fast connection'
    if (downlink > 5)
      return 'Fast connection'
    if (downlink > 1)
      return 'Good connection'
    return 'Moderate connection'
  }

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium flex items-center gap-2">
          🌐 Network Information Demo
        </h3>
        <p className="text-sm text-gray-600">
          Monitor network connection status, speed, and quality using the Network Information API.
        </p>
      </div>

      {!isSupported
        ? (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded text-center">
              <div className="text-3xl mb-3">⚠️</div>
              <div className="font-medium text-yellow-800 mb-2">Limited Browser Support</div>
              <div className="text-sm text-yellow-700">
                The Network Information API is not fully supported in this browser.
                Only basic online/offline status is available.
              </div>
              <div className="mt-4 p-3 bg-white rounded border">
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="font-medium">
                    {online ? '✅ Online' : '❌ Offline'}
                  </span>
                </div>
              </div>
            </div>
          )
        : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Connection Status */}
              <div className={`p-4 rounded border-2 transition-all duration-300 ${
                online ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
              }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{getConnectionIcon()}</div>
                  <div className="font-medium mb-1">
                    {online ? 'Connected' : 'Disconnected'}
                  </div>
                  <div className={`text-sm px-2 py-1 rounded inline-block ${
                    online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                  >
                    {online ? '✅ Online' : '❌ Offline'}
                  </div>
                </div>
              </div>

              {/* Connection Quality */}
              <div className="p-4 border rounded bg-blue-50">
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium text-blue-800 mb-2">Connection Quality</div>
                  <div className={`w-full h-2 rounded-full mb-2 ${getConnectionQualityColor()}`} />
                  <div className="text-sm font-medium">{effectiveType?.toUpperCase()}</div>
                  <div className="text-xs text-blue-600 mt-1">{getSpeedDescription()}</div>
                </div>
              </div>

              {/* Speed Metrics */}
              <div className="p-4 border rounded bg-purple-50">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-medium text-purple-800 mb-2">Speed</div>
                  <div className="text-lg font-mono">
                    {downlink}
                    {' '}
                    Mbps
                  </div>
                  <div className="text-xs text-purple-600">Download Speed</div>
                  {downlinkMax && (
                    <div className="text-xs text-purple-500 mt-1">
                      Max:
                      {' '}
                      {downlinkMax}
                      {' '}
                      Mbps
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

      {isSupported && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detailed Metrics */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              📈 Network Metrics
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Latency (RTT):</span>
                <span className="font-mono text-sm">
                  {rtt}
                  ms
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Connection Type:</span>
                <span className="font-mono text-sm capitalize">{type || 'Unknown'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Data Saver:</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  saveData ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                }`}
                >
                  {saveData ? '📱 Enabled' : '💾 Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Connection Health */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              🏥 Connection Health
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded border">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${isConnectionSlow ? 'bg-red-500' : 'bg-green-500'}`} />
                  <span className="text-sm font-medium">Speed Status</span>
                </div>
                <div className="text-xs text-gray-600">
                  {isConnectionSlow ? 'Connection may be slow for heavy content' : 'Connection speed looks good'}
                </div>
              </div>

              <div className="p-3 rounded border">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${rtt > 500 ? 'bg-red-500' : rtt > 200 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  <span className="text-sm font-medium">Latency Status</span>
                </div>
                <div className="text-xs text-gray-600">
                  {rtt > 500 ? 'High latency detected' : rtt > 200 ? 'Moderate latency' : 'Low latency'}
                </div>
              </div>

              {saveData && (
                <div className="p-3 rounded border border-orange-200 bg-orange-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-600">📱</span>
                    <span className="text-sm font-medium text-orange-800">Data Saver Active</span>
                  </div>
                  <div className="text-xs text-orange-700">
                    User has enabled data saving mode
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-50 rounded border">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          🔍 Browser Support
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-green-600">✅</span>
            <span>Chrome 61+</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600">✅</span>
            <span>Edge 79+</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600">❌</span>
            <span>Firefox</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600">❌</span>
            <span>Safari</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        💡 The Network Information API provides insights into connection quality and helps optimize content delivery based on network conditions.
      </div>
    </div>
  )
}
