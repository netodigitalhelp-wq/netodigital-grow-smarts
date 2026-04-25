import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting children until the placeholder enters the viewport
 * (with a configurable rootMargin). After the first reveal it stays mounted.
 *
 * Use to avoid running heavy section logic / hydration cost on initial paint.
 */
export function LazyMount({
  children,
  rootMargin = "200px",
  minHeight,
  className,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, rootMargin]);

  return (
    <div ref={ref} className={className} style={!shown && minHeight ? { minHeight } : undefined}>
      {shown ? children : null}
    </div>
  );
}
