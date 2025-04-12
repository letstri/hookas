# Hookas

Hookas is a registry for most popular React hooks based on the [shadcn](https://ui.shadcn.com/) registry system.

## How to use

Find the hook you want to use and copy the link to install the hook into your project. Please note you should have setup shadcn in your project to use this.

## Hooks

- [useIsOnline](#useisonline) - Check if the user is online
- [useAsyncEffect](#useasynceffect) - Run asynchronous effects safely
- [useElementSize](#useelementsize) - Track element dimensions
- [useClickOutside](#useclickoutside) - Detect clicks outside an element
- [useToggle](#usetoggle) - Toggle boolean states easily
- [useWindowSize](#usewindowsize) - Track window dimensions
- [useIsMounted](#useismounted) - Check if the component is mounted

### useIsOnline

Check if the user is online.

#### Usage

```tsx
const isOnline = useIsOnline()
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-online.json
```

### useAsyncEffect

Run an async effect.

#### Usage

```tsx
useAsyncEffect(async () => {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  console.log(data)
}, [])
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-async-effect.json
```

### useElementSize

Measure the size of an element.

#### Usage

```tsx
const ref = useRef(null)
const { width, height } = useElementSize(ref)

return (
  <div ref={ref}>
    <p>
      Width:
      {width}
    </p>
    <p>
      Height:
      {height}
    </p>
  </div>
)
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-element-size.json
```

### useClickOutside

Handle click outside events.

#### Usage

```tsx
const ref = useRef(null)

useClickOutside(ref, () => console.log('clicked outside'))
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-click-outside.json
```

### useToggle

Toggle a value.

#### Usage

```tsx
const [value, toggle] = useToggle()
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-toggle.json
```

### useWindowSize

Get the size of the window.

#### Usage

```tsx
const { width, height } = useWindowSize()
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-window-size.json
```

### useIsMounted

Check if the component is mounted.

#### Usage

```tsx
const isMounted = useIsMounted()
```

#### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-mounted.json
```
