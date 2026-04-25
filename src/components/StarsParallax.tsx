import { useEffect, useRef } from "react";

/**
 * Lightweight starfield with 3 parallax layers. Uses translate3d on scroll
 * so layers move at different speeds (background slower, foreground faster).
 */
export function StarsParallax() {
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (l1.current) l1.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        if (l2.current) l2.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        if (l3.current) l3.current.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dots = (count: number, size: number, opacity: number, color: string) => {
    const positions: string[] = [];
    // Deterministic pseudo-random
    for (let i = 0; i < count; i++) {
      const x = ((i * 73) % 100) + ((i * 17) % 7) * 0.3;
      const y = ((i * 41) % 100) + ((i * 13) % 5) * 0.4;
      positions.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, ${color} ${opacity}, transparent)`);
    }
    return positions.join(", ");
  };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      <div
        ref={l1}
        className="absolute inset-0 will-change-transform"
        style={{ background: dots(40, 1, 0.5, "oklch(0.95 0.02 240)"), backgroundSize: "100% 200%" }}
      />
      <div
        ref={l2}
        className="absolute inset-0 will-change-transform"
        style={{ background: dots(25, 1.5, 0.7, "oklch(0.85 0.12 220)"), backgroundSize: "100% 200%" }}
      />
      <div
        ref={l3}
        className="absolute inset-0 will-change-transform"
        style={{ background: dots(15, 2, 0.9, "oklch(0.8 0.18 295)"), backgroundSize: "100% 200%" }}
      />
    </div>
  );
}
