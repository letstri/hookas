# Hookas

Hookas is a comprehensive registry for popular React hooks, inspired by the [shadcn](https://ui.shadcn.com/) registry system. It provides a collection of well-tested, production-ready hooks that solve common React development challenges.

## How to use

Find the hook you want to use and copy the link to install the hook into your project. Please note you should have setup shadcn in your project to use this.

## Hooks

### State & Effects

- [useToggle](#usetoggle) - Manage boolean state with a toggle function
- [useDebouncedState](#usedebouncedstate) - Manage state with debounced updates
- [useDebouncedMemo](#usedebouncedmemo) - Debounce expensive computations
- [useDebouncedCallback](#usedebouncedcallback) - Debounce function calls for performance
- [useThrottledCallback](#usethrottledcallback) - Throttle function calls to control execution rate
- [useInterval](#useinterval) - Run a function repeatedly with a delay
- [useTimeoutEffect](#usetimeouteffect) - Run an effect after a timeout
- [useMountedEffect](#usemountedeffect) - Run an effect after the component is mounted
- [useIsMounted](#useismounted) - Check if the component is mounted
- [useIsomorphicEffect](#useisomorphiceffect) - Run an effect on both client and server
- [useInitializedEffect](#useinitializedeffect) - Run an effect only after all dependencies are defined
- [useInitializedEffectOnce](#useinitializedeffectonce) - Run an effect only once after all dependencies are defined
- [usePromise](#usepromise) - Handle promises without the `use` hook
- [useAsyncEffect](#useasynceffect) - Run asynchronous operations in React effects

### Data & Storage

- [useQuery](#usequery) - Fetch data with a lightweight query hook
- [useLocalStorage](#uselocalstorage) - Store data in local storage
- [useSessionStorage](#usesessionstorage) - Store data in session storage

### Media & UI

- [useMediaQuery](#usemediaquery) - Respond to CSS media queries
- [useFullscreen](#usefullscreen) - Control fullscreen mode
- [useMediaControls](#usemediacontrols) - Control media elements

### DOM & Events

- [useClickOutside](#useclickoutside) - Detect clicks outside specified elements
- [useElementSize](#useelementsize) - Track element size with ResizeObserver
- [useWindowSize](#usewindowsize) - Track window size
- [useMousePosition](#usemouseposition) - Track mouse position

### Scroll & Viewport

- [useIsScrolled](#useisscrolled) - Check if an element is scrolled
- [useScrollDirection](#usescrolldirection) - Track scroll direction
- [useIsInViewport](#useisinviewport) - Check if an element is in the viewport
- [useIsWindowScrolled](#useiswindowscrolled) - Check if the window is scrolled
- [useScrollInfo](#usescrollinfo) - Get scroll information for an element

### Network

- [useNetwork](#usenetwork) - Monitor network status and type

### Date & Time

- [useDateFormat](#usedateformat) - Format dates with customizable patterns and locales

### useNetwork

Monitor network connection status, type, and quality using the Network Information API.

#### Usage

```tsx
import { useNetwork } from '@/hookas/use-network'

function NetworkStatus() {
  const {
    effectiveType,
    downlink,
    rtt,
    saveData,
    isConnectionSlow,
    isSupported,
    type,
    online
  } = useNetwork()

  if (!isSupported) {
    return <div>Network Information API not supported</div>
  }

  return (
    <div>
      <p>
        Status:
        {online ? 'Online' : 'Offline'}
      </p>
      <p>
        Connection Type:
        {effectiveType}
      </p>
      <p>
        Speed:
        {downlink}
        {' '}
        Mbps
      </p>
      <p>
        Latency:
        {rtt}
        ms
      </p>
      <p>
        Technology:
        {type}
      </p>
      {isConnectionSlow && <p>⚠️ Slow connection detected</p>}
      {saveData && <p>📱 Data saver mode enabled</p>}
    </div>
  )
}
```

#### Network State Properties

The hook returns a `NetworkState` object with the following properties:

- **`downlink`**: Effective bandwidth estimate in megabits per second
- **`downlinkMax`**: Maximum downlink speed in Mbps (experimental, may be undefined)
- **`effectiveType`**: Connection quality ('slow-2g', '2g', '3g', '4g')
- **`rtt`**: Round-trip time in milliseconds
- **`saveData`**: Whether data saver mode is enabled
- **`type`**: Connection technology ('wifi', 'cellular', 'ethernet', etc.)
- **`isSupported`**: Whether the Network Information API is supported
- **`isConnectionSlow`**: Computed boolean for slow connections (slow-2g or 2g)
- **`online`**: Whether the user is currently online (works in all browsers)

#### Browser Support

The Network Information API has limited browser support:

- ✅ Chrome/Edge (61+)
- ✅ Chrome Android (38+)
- ✅ Samsung Internet (3+)
- ❌ Firefox
- ❌ Safari

The hook gracefully handles unsupported browsers by returning default values and `isSupported: false`.

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-network.json
```

### useAsyncEffect

Run an async effect.

#### Usage

```tsx
import { useState } from 'react'
import { useAsyncEffect } from '@/hookas/use-async-effect'

function DataFetcher() {
  const [data, setData] = useState(null)

  useAsyncEffect(async () => {
    const res = await fetch('https://api.example.com/data')
    const json = await res.json()
    setData(json)
  }, [])

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-async-effect.json
```

### useElementSize

Measure the size of an element.

#### Usage

```tsx
import { useRef } from 'react'
import { useElementSize } from '@/hookas/use-element-size'

function ResizableBox() {
  const ref = useRef(null)
  const { width, height } = useElementSize(ref)

  return (
    <div ref={ref}>
      <p>
        Width:
        {width}
        px
      </p>
      <p>
        Height:
        {height}
        px
      </p>
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-element-size.json
```

### useClickOutside

Handle click outside events.

#### Usage

```tsx
import { useRef, useState } from 'react'
import { useClickOutside } from '@/hookas/use-click-outside'

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, () => setIsOpen(false))

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      {isOpen && <div>Menu Content</div>}
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-click-outside.json
```

### useToggle

Toggle a value.

#### Usage

```tsx
import { useToggle } from '@/hookas/use-toggle'

function ToggleButton() {
  const [isOn, toggle] = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
      <span>
        State:
        {isOn ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-toggle.json
```

### useWindowSize

Get the size of the window.

#### Usage

```tsx
import { useWindowSize } from '@/hookas/use-window-size'

function WindowSizeDisplay() {
  const { width, height } = useWindowSize()

  return (
    <div>
      <p>
        Width:
        {width}
        px
      </p>
      <p>
        Height:
        {height}
        px
      </p>
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-window-size.json
```

### useIsMounted

Check if the component is mounted.

#### Usage

```tsx
import { useEffect, useState } from 'react'
import { useIsMounted } from '@/hookas/use-is-mounted'

function MountStatus() {
  const isMounted = useIsMounted()

  return (
    <div>
      Component is
      {isMounted ? 'mounted' : 'not mounted'}
      !
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-mounted.json
```

### useQuery

Small alternative to @tanstack/react-query.

#### Usage

```tsx
import { useQuery } from '@/hookas/use-query'

function DataFetcher() {
  const { data, error, status, refetch } = useQuery(() => fetch('https://api.example.com/data'))

  return <div>{JSON.stringify(data)}</div>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-query.json
```

### useMediaQuery

Check if the browser matches a media query.

#### Usage

```tsx
import { useMediaQuery } from '@/hookas/use-media-query'

function MediaQueryExample() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-media-query.json
```

### useFullscreen

Handle fullscreen mode.

#### Usage

```tsx
import { useFullscreen } from '@/hookas/use-fullscreen'

function FullscreenExample() {
  const { isFullscreen, toggleFullscreen } = useFullscreen()
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-fullscreen.json
```

### useMousePosition

Track the mouse position.

#### Usage

```tsx
import { useMousePosition } from '@/hookas/use-mouse-position'

function MousePosition() {
  const { x, y } = useMousePosition()
}

function MousePosition() {
  const ref = useRef(null)
  const { x, y } = useMousePosition(ref)

  return (
    <div ref={ref}>
      {x}
      {y}
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-mouse-position.json
```

### useDebouncedCallback

Debounce a callback.

#### Usage

```tsx
import { useDebouncedCallback } from '@/hookas/use-debounced-callback'

function DebouncedCallback() {
  const debouncedFn = useDebouncedCallback((a: number, b: number) => {
    console.log(a, b)
  }, 1000)

  return <button onClick={() => debouncedFn(1, 2)}>Debounce</button>
}
```

### useDebouncedMemo

Debounce a memo.

#### Usage

```tsx
import { useDebouncedMemo } from '@/hookas/use-debounced-memo'

function DebouncedMemo() {
  const debouncedMemo = useDebouncedMemo(() => 'Hello', [1, 2, 3], 1000)

  return <div>{debouncedMemo}</div>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-debounced-memo.json
```

### useDebouncedState

Debounce a state.

#### Usage

```tsx
import { useDebouncedState } from '@/hookas/use-debounced-state'

function DebouncedState() {
  const [debouncedState, state, setState] = useDebouncedState('Hello', 1000)
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-debounced-state.json
```

### useThrottledCallback

Throttle a callback.

#### Usage

```tsx
import { useThrottledCallback } from '@/hookas/use-throttled-callback'

function ThrottledCallback() {
  const throttledFn = useThrottledCallback((a: number, b: number) => {
    console.log(a, b)
  }, 1000)

  return <button onClick={() => throttledFn(1, 2)}>Throttle</button>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-throttled-callback.json
```

### usePromise

Handle promises without `use` hook.

#### Usage

```tsx
import { usePromise } from '@/hookas/use-promise'

function PromiseExample() {
  const data = usePromise(() => Promise.resolve([{ name: 'Valerii' }]), [])

  return (
    <div>
      {data.map(item => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-promise.json
```

### useMediaControls

Control media elements.

#### Usage

```tsx
import { useMediaControls } from '@/hookas/use-media-controls'

function MediaControls() {
  const mediaRef = useRef<HTMLVideoElement>(null)
  const {
    play,
    pause,
    toggle,
    stop,
    toggleMute,
    setVolume,
    setCurrentTime,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
  } = useMediaControls(mediaRef)

  return (
    <div>
      <video ref={mediaRef} src="src/assets/video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-media-controls.json
```

### useIsScrolled

Check if an element is scrolled.

#### Usage

```tsx
import { useIsScrolled } from '@/hookas/use-is-scrolled'

function IsScrolled() {
  const ref = useRef(null)
  const isScrolled = useIsScrolled(ref)

  return <div ref={ref}>{isScrolled ? 'Scrolled' : 'Not scrolled'}</div>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-scrolled.json
```

### useInterval

Execute a function repeatedly with a delay.

#### Usage

```tsx
import { useInterval } from '@/hookas/use-interval'

function IntervalExample() {
  useInterval(() => console.log('Hello'), 1000)
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-interval.json
```

### useMountedEffect

Run an effect only after the component is mounted.

#### Usage

```tsx
import { useMountedEffect } from '@/hookas/use-mounted-effect'

function MountedEffect() {
  useMountedEffect(() => console.log('Hello'), [])
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-mount-effect.json
```

### useIsomorphicEffect

Run an effect on the client and server.

#### Usage

```tsx
import { useIsomorphicEffect } from '@/hookas/use-isomorphic-effect'

function IsomorphicEffect() {
  useIsomorphicEffect(() => {
    console.log('Hello')
  }, [])
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-isomorphic-effect.json
```

### useLocalStorage

Store data in the browser's local storage.

#### Usage

```tsx
import { useLocalStorage } from '@/hookas/use-local-storage'

function LocalStorageExample() {
  const [value, setValue] = useLocalStorage('my-key', 'defaultValue')
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-local-storage.json
```

### useSessionStorage

Store data in the browser's session storage.

#### Usage

```tsx
import { useSessionStorage } from '@/hookas/use-session-storage'

function SessionStorageExample() {
  const [value, setValue] = useSessionStorage('my-key', 'defaultValue')
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-session-storage.json
```

### useScrollDirection

Track the scroll direction.

#### Usage

```tsx
import { useScrollDirection } from '@/hookas/use-scroll-direction'

function ScrollDirection() {
  const direction = useScrollDirection()
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-scroll-direction.json
```

### useIsInViewport

Check if an element is visible.

#### Usage

```tsx
import { useIsInViewport } from '@/hookas/use-is-in-viewport'

function IsInViewport() {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref)

  return <div ref={ref}>{isInViewport ? 'In viewport' : 'Not in viewport'}</div>
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-in-viewport.json
```

### useIsWindowScrolled

Check if the window is scrolled.

#### Usage

```tsx
import { useIsWindowScrolled } from '@/hookas/use-is-window-scrolled'

function IsWindowScrolled() {
  const isScrolled = useIsWindowScrolled()
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-window-scrolled.json
```

### useInitializedEffect

Run an effect only after all dependencies are not undefined.

#### Usage

```tsx
import { useInitializedEffect } from '@/hookas/use-initialized-effect'

function InitializedEffect() {
  // This will run only once after the dependencies are not undefined
  useInitializedEffect(() => {
    console.log('Hello')
  }, [1, 2, 3])
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-initialized-effect.json
```

### useInitializedEffectOnce

Run an effect only once after all dependencies are not undefined.

#### Usage

```tsx
import { useInitializedEffectOnce } from '@/hookas/use-initialized-effect-once'

function InitializedEffectOnce() {
  // This will run only once after the dependencies are not undefined
  useInitializedEffectOnce(() => {
    console.log('Hello')
  }, [1, 2, 3])
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-initialized-effect-once.json
```

### useTimeoutEffect

Run an effect after a timeout.

#### Usage

```tsx
import { useTimeoutEffect } from '@/hookas/use-timeout-effect'

function TimeoutEffect() {
  useTimeoutEffect(() => {
    console.log('Hello')
  }, 1000)
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-timeout-effect.json
```

### useScrollInfo

Get the scroll info of an element.

#### Usage

```tsx
import { useScrollInfo } from '@/hookas/use-scroll-info'

function ScrollInfo() {
  const ref = useRef(null)
  const { left, top, right, bottom } = useScrollInfo(ref)

  return (
    <div ref={ref}>
      {left}
      {' '}
      {top}
      {' '}
      {right}
      {' '}
      {bottom}
    </div>
  )
}
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-scroll-info.json
```

### useDateFormat

Format dates with customizable patterns and locales. Supports a wide range of format tokens for year, month, day, hour, minute, second, millisecond, meridiem, weekday, and timezone formatting.

#### Usage

```tsx
import { useDateFormat } from '@/hookas/use-date-format'

function DateDisplay() {
  const date = new Date()

  // Basic formatting
  const formattedTime = useDateFormat(date, 'HH:mm:ss')
  const formattedDate = useDateFormat(date, 'YYYY-MM-DD')
  const fullFormat = useDateFormat(date, 'dddd, MMMM Do, YYYY [at] h:mm A')

  return (
    <div>
      <p>
        Time:
        {formattedTime}
      </p>
      <p>
        Date:
        {formattedDate}
      </p>
      <p>
        Full:
        {fullFormat}
      </p>
    </div>
  )
}

// With custom locale
function LocalizedDate() {
  const date = new Date()
  const frenchDate = useDateFormat(date, 'dddd, DD MMMM YYYY', {
    locales: 'fr-FR'
  })

  return <p>{frenchDate}</p>
}

// With custom meridiem
function CustomMeridiem() {
  const date = new Date()
  const customTime = useDateFormat(date, 'h:mm a', {
    customMeridiem: (hours, minutes, isLowercase) => {
      const period = hours < 12 ? 'Morning' : 'Evening'
      return isLowercase ? period.toLowerCase() : period
    }
  })

  return <p>{customTime}</p>
}

// Dynamic date formatting
function DynamicFormat() {
  const [format, setFormat] = useState('YYYY-MM-DD')
  const [date] = useState(new Date())

  const formatted = useDateFormat(date, format)

  return (
    <div>
      <select value={format} onChange={e => setFormat(e.target.value)}>
        <option value="YYYY-MM-DD">ISO Date</option>
        <option value="MM/DD/YYYY">US Format</option>
        <option value="DD/MM/YYYY">EU Format</option>
        <option value="dddd, MMMM Do, YYYY">Full Date</option>
        <option value="h:mm:ss A">12-hour Time</option>
        <option value="HH:mm:ss">24-hour Time</option>
      </select>
      <p>
        Formatted:
        {formatted}
      </p>
    </div>
  )
}
```

#### Format Tokens

The hook supports a comprehensive set of format tokens:

**Year:**

- `YYYY` - 4-digit year (2024)
- `YY` - 2-digit year (24)
- `Yo` - Ordinal year (2024th)

**Month:**

- `M` - Month number (1-12)
- `MM` - Zero-padded month (01-12)
- `MMM` - Short month name (Jan, Feb, Mar)
- `MMMM` - Full month name (January, February, March)
- `Mo` - Ordinal month (1st, 2nd, 3rd)

**Day:**

- `D` - Day of month (1-31)
- `DD` - Zero-padded day (01-31)
- `Do` - Ordinal day (1st, 2nd, 3rd)

**Weekday:**

- `d` - Day of week number (0-6, Sunday=0)
- `dd` - Narrow weekday name (S, M, T)
- `ddd` - Short weekday name (Sun, Mon, Tue)
- `dddd` - Full weekday name (Sunday, Monday, Tuesday)

**Hour:**

- `H` - 24-hour format (0-23)
- `HH` - Zero-padded 24-hour (00-23)
- `h` - 12-hour format (1-12)
- `hh` - Zero-padded 12-hour (01-12)
- `Ho` - Ordinal 24-hour (0th, 1st, 2nd)
- `ho` - Ordinal 12-hour (12th, 1st, 2nd)

**Minute:**

- `m` - Minutes (0-59)
- `mm` - Zero-padded minutes (00-59)
- `mo` - Ordinal minutes (0th, 1st, 2nd)

**Second:**

- `s` - Seconds (0-59)
- `ss` - Zero-padded seconds (00-59)
- `so` - Ordinal seconds (0th, 1st, 2nd)

**Millisecond:**

- `SSS` - Zero-padded milliseconds (000-999)

**Meridiem:**

- `A` - Uppercase meridiem (AM, PM)
- `AA` - Uppercase with periods (A.M., P.M.)
- `a` - Lowercase meridiem (am, pm)
- `aa` - Lowercase with periods (a.m., p.m.)

**Timezone:**

- `z`, `zz`, `zzz` - Short timezone offset (+05:30)
- `zzzz` - Long timezone offset (+05:30)

**Escaping:**

- `[text]` - Escaped text that won't be formatted

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-date-format.json
```
