'use client'

import { useMediaQuery } from '../../registry/hooks/use-media-query'

export function MediaQueryDemo() {
  // Screen size queries
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  // Feature queries
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const canHover = useMediaQuery('(hover: hover)')

  // Orientation and aspect ratio
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')
  const isWidescreen = useMediaQuery('(min-aspect-ratio: 16/9)')

  const getCurrentDevice = () => {
    if (isMobile)
      return 'Mobile'
    if (isTablet)
      return 'Tablet'
    if (isDesktop)
      return 'Desktop'
    return 'Unknown'
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Media Query Demo</h3>
        <p className="text-sm text-gray-600">
          Resize your window or change device orientation to see the queries in action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-medium text-blue-800">Screen Size</h4>
          <div className="text-sm mt-2 space-y-1">
            <div className={`flex items-center gap-2 ${isMobile ? 'text-green-600' : 'text-gray-400'}`}>
              {isMobile ? '✅' : '❌'}
              {' '}
              Mobile (≤768px)
            </div>
            <div className={`flex items-center gap-2 ${isTablet ? 'text-green-600' : 'text-gray-400'}`}>
              {isTablet ? '✅' : '❌'}
              {' '}
              Tablet (769-1024px)
            </div>
            <div className={`flex items-center gap-2 ${isDesktop ? 'text-green-600' : 'text-gray-400'}`}>
              {isDesktop ? '✅' : '❌'}
              {' '}
              Desktop (≥1025px)
            </div>
            <div className="font-medium text-blue-600">
              Current:
              {' '}
              {getCurrentDevice()}
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-green-800">User Preferences</h4>
          <div className="text-sm mt-2 space-y-1">
            <div className={`flex items-center gap-2 ${prefersDark ? 'text-green-600' : 'text-gray-400'}`}>
              {prefersDark ? '✅' : '❌'}
              {' '}
              Dark mode
            </div>
            <div className={`flex items-center gap-2 ${prefersReducedMotion ? 'text-green-600' : 'text-gray-400'}`}>
              {prefersReducedMotion ? '✅' : '❌'}
              {' '}
              Reduced motion
            </div>
            <div className={`flex items-center gap-2 ${canHover ? 'text-green-600' : 'text-gray-400'}`}>
              {canHover ? '✅' : '❌'}
              {' '}
              Can hover
            </div>
          </div>
        </div>

        <div className="p-3 border rounded">
          <h4 className="font-medium text-purple-800">Orientation & Ratio</h4>
          <div className="text-sm mt-2 space-y-1">
            <div className={`flex items-center gap-2 ${isPortrait ? 'text-green-600' : 'text-gray-400'}`}>
              {isPortrait ? '✅' : '❌'}
              {' '}
              Portrait
            </div>
            <div className={`flex items-center gap-2 ${isLandscape ? 'text-green-600' : 'text-gray-400'}`}>
              {isLandscape ? '✅' : '❌'}
              {' '}
              Landscape
            </div>
            <div className={`flex items-center gap-2 ${isWidescreen ? 'text-green-600' : 'text-gray-400'}`}>
              {isWidescreen ? '✅' : '❌'}
              {' '}
              Widescreen (16:9+)
            </div>
          </div>
        </div>
      </div>

      <div className={`p-3 rounded border-2 transition-colors ${
        isMobile
          ? 'bg-blue-50 border-blue-200'
          : isTablet
            ? 'bg-green-50 border-green-200'
            : 'bg-purple-50 border-purple-200'
      }`}
      >
        <h4 className="font-medium">Responsive Example</h4>
        <p className="text-sm mt-1">
          This box changes color based on screen size:
          <span className="font-medium ml-1">
            {isMobile ? 'Blue for Mobile' : isTablet ? 'Green for Tablet' : 'Purple for Desktop'}
          </span>
        </p>
      </div>

      <div className="text-xs text-gray-500">
        Try resizing your browser window, rotating your device, or changing your system theme preferences.
      </div>
    </div>
  )
}
