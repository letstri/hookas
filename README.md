# Hookas

Hookas is a registry for most popular React hooks based on the [shadcn](https://ui.shadcn.com/) registry system.

## How to use

Find the hook you want to use and copy the link to install the hook into your project. Please note you should have setup shadcn in your project to use this.

### Hooks

- [useIsOnline](#useisonline)
- [useAsyncEffect](#useasynceffect)
- [useElementSize](#useelementsize)
- [useClickAway](#useclickaway)
- [useToggle](#usetoggle)

#### useIsOnline

Check if the user is online.

##### Usage

```tsx
const isOnline = useIsOnline();
```

##### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-is-online.json
```

#### useAsyncEffect

Run an async effect.

##### Usage

```tsx
useAsyncEffect(async () => {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}, []);
```

##### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-async-effect.json
```

#### useElementSize

Measure the size of an element.

##### Usage

```tsx
const [ref, { width, height }] = useElementSize();

<div ref={ref}>
  <p>Width: {width}</p>
  <p>Height: {height}</p>
</div>;
```

##### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-element-size.json
```

#### useClickAway

Handle click away events.

##### Usage

```tsx
const ref = useRef(null);

useClickAway(ref, () => console.log("clicked away"));
```

##### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-click-away.json
```

#### useToggle

Toggle a value.

##### Usage

```tsx
const [value, toggle] = useToggle();
```

##### Install

```bash
npx shadcn@latest add https://hookas.letstri.dev/r/use-toggle.json
```
