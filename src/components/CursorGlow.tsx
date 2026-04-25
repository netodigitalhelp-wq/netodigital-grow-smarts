import { useEffect, useRef } from "react";

/**
 * Mouse/touch follower radial glow. Sits fixed beneath the glass layers.
 * Uses requestAnimationFrame for 60fps smoothness.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
      if (Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3) {
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-10 w-[560px] h-[560px] rounded-full will-change-transform hidden md:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.84 0.16 220 / 0.18), oklch(0.55 0.27 295 / 0.10) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}
