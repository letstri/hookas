import * as React from "react";

export function useElementSize<T extends Element = Element>(ref: React.RefObject<T | null>) {
  const [size, setSize] = React.useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  const previousObserver = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    const element = ref.current;

    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (element?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];

          setSize({ width, height });
        }
      });

      observer.observe(element);
      previousObserver.current = observer;
    }

    return () => {
      if (previousObserver.current) {
        previousObserver.current.disconnect();
        previousObserver.current = null;
      }
    };
  }, [ref]);

  return size
}
