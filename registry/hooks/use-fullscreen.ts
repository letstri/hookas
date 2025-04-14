'use client'

import * as React from 'react'

export function useFullscreen({
  element,
  onFullscreenChange,
}: {
  element?: React.RefObject<HTMLElement>
  onFullscreenChange?: (isFullscreen: boolean) => void
} = {}) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const enterFullscreen = React.useCallback(async () => {
    const targetElement = element?.current || document.documentElement

    try {
      if (targetElement.requestFullscreen) {
        await targetElement.requestFullscreen()
      }
      else if ('mozRequestFullScreen' in targetElement && typeof targetElement.mozRequestFullScreen === 'function') {
        await targetElement.mozRequestFullScreen()
      }
      else if ('webkitRequestFullscreen' in targetElement && typeof targetElement.webkitRequestFullscreen === 'function') {
        await targetElement.webkitRequestFullscreen()
      }
      else if ('msRequestFullscreen' in targetElement && typeof targetElement.msRequestFullscreen === 'function') {
        await targetElement.msRequestFullscreen()
      }
    }
    catch (error) {
      console.error('Failed to enter fullscreen mode:', error)
    }
  }, [element])

  const exitFullscreen = React.useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
      else if ('mozCancelFullScreen' in document && typeof document.mozCancelFullScreen === 'function') {
        await document.mozCancelFullScreen()
      }
      else if ('webkitExitFullscreen' in document && typeof document.webkitExitFullscreen === 'function') {
        await document.webkitExitFullscreen()
      }
      else if ('msExitFullscreen' in document && typeof document.msExitFullscreen === 'function') {
        await document.msExitFullscreen()
      }
    }
    catch (error) {
      console.error('Failed to exit fullscreen mode:', error)
    }
  }, [])

  const toggleFullscreen = React.useCallback(() => {
    if (isFullscreen) {
      exitFullscreen()
    }
    else {
      enterFullscreen()
    }
  }, [enterFullscreen, exitFullscreen, isFullscreen])

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement
        = document.fullscreenElement
          || (document as any).mozFullScreenElement
          || (document as any).webkitFullscreenElement
          || (document as any).msFullscreenElement

      const newIsFullscreen = !!fullscreenElement
      setIsFullscreen(newIsFullscreen)

      if (onFullscreenChange) {
        onFullscreenChange(newIsFullscreen)
      }
    }

    const abortController = new AbortController()

    document.addEventListener('fullscreenchange', handleFullscreenChange, { signal: abortController.signal })
    document.addEventListener('mozfullscreenchange', handleFullscreenChange, { signal: abortController.signal })
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange, { signal: abortController.signal })
    document.addEventListener('MSFullscreenChange', handleFullscreenChange, { signal: abortController.signal })

    return () => {
      abortController.abort()
    }
  }, [onFullscreenChange])

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  }
}
