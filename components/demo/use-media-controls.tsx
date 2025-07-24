'use client'

import { useRef } from 'react'
import { useMediaControls } from '../../registry/hooks/use-media-controls'

export function MediaControlsDemo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const audioControls = useMediaControls(audioRef)
  const videoControls = useMediaControls(videoRef)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatProgress = (current: number, total: number) => {
    return total > 0 ? Math.round((current / total) * 100) : 0
  }

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Media Controls Demo</h3>
        <p className="text-sm text-gray-600">
          Control audio and video playback with custom controls.
        </p>
      </div>

      {/* Audio Player */}
      <div className="p-4 border rounded bg-blue-50">
        <h4 className="font-medium text-blue-800 mb-3">Audio Player</h4>

        <audio
          ref={audioRef}
          src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
          preload="metadata"
          className="hidden"
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={audioControls.toggle}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              {audioControls.isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              type="button"
              onClick={audioControls.stop}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              ⏹️ Stop
            </button>
            <button
              type="button"
              onClick={() => audioControls.toggleMute()}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              {audioControls.isMuted ? '🔊 Unmute' : '🔇 Mute'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span>Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={audioControls.volume}
                onChange={e => audioControls.setVolume(Number.parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="w-8 text-center">
                {Math.round(audioControls.volume * 100)}
                %
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span>Progress:</span>
              <input
                type="range"
                min="0"
                max={audioControls.duration}
                value={audioControls.currentTime}
                onChange={e => audioControls.setCurrentTime(Number.parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="w-16 text-center text-xs">
                {formatTime(audioControls.currentTime)}
                {' '}
                /
                {formatTime(audioControls.duration)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium">Status</div>
              <div>{audioControls.isPlaying ? 'Playing' : 'Paused'}</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Progress</div>
              <div>
                {formatProgress(audioControls.currentTime, audioControls.duration)}
                %
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Duration</div>
              <div>{formatTime(audioControls.duration)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="p-4 border rounded bg-green-50">
        <h4 className="font-medium text-green-800 mb-3">Video Player</h4>

        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          preload="metadata"
          className="w-full max-w-md mx-auto mb-3 rounded"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%236b7280'%3EVideo Placeholder%3C/text%3E%3C/svg%3E"
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <button
              type="button"
              onClick={videoControls.toggle}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              {videoControls.isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              type="button"
              onClick={videoControls.stop}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              ⏹️ Stop
            </button>
            <button
              type="button"
              onClick={() => videoControls.toggleMute()}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              {videoControls.isMuted ? '🔊 Unmute' : '🔇 Mute'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span>Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={videoControls.volume}
                onChange={e => videoControls.setVolume(Number.parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="w-8 text-center">
                {Math.round(videoControls.volume * 100)}
                %
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span>Progress:</span>
              <input
                type="range"
                min="0"
                max={videoControls.duration}
                value={videoControls.currentTime}
                onChange={e => videoControls.setCurrentTime(Number.parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="w-16 text-center text-xs">
                {formatTime(videoControls.currentTime)}
                {' '}
                /
                {formatTime(videoControls.duration)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium">Status</div>
              <div>{videoControls.isPlaying ? 'Playing' : 'Paused'}</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Progress</div>
              <div>
                {formatProgress(videoControls.currentTime, videoControls.duration)}
                %
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Volume</div>
              <div>{videoControls.isMuted ? 'Muted' : `${Math.round(videoControls.volume * 100)}%`}</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Duration</div>
              <div>{formatTime(videoControls.duration)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Note: Media files may take a moment to load. The hook provides comprehensive control over audio and video elements.
      </div>
    </div>
  )
}
