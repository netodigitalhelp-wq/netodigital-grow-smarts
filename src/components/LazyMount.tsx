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
  // Render children during SSR + initial hydration so server/client trees match.
  // After mount, switch to lazy mode and let IntersectionObserver re-mount on visibility.
  const [hydrated, setHydrated] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true);
      // Decide visibility post-hydration: keep mounted if already in/near view, otherwise unmount until IO triggers.
      const el = ref.current;
      if (el && typeof IntersectionObserver !== "undefined") {
        const rect = el.getBoundingClientRect();
        const margin = parseInt(rootMargin, 10) || 200;
        const inView = rect.top < window.innerHeight + margin && rect.bottom > -margin;
        if (!inView) setShown(false);
      }
      return;
    }
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
  }, [hydrated, shown, rootMargin]);

  return (
    <div ref={ref} className={className} style={!shown && minHeight ? { minHeight } : undefined}>
      {shown ? children : null}
    </div>
  );
}
