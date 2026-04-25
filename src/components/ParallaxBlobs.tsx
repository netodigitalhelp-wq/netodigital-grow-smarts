import { useEffect, useRef } from "react";

/**
 * Two large blurred color blobs (cyan + violet) fixed behind content.
 * Lazily follow the cursor with a heavy lerp for an Apple-grade depth feel.
 * Lives behind everything (z-index: -20) and ignores pointer events.
 */
export function ParallaxBlobs() {
  const cyan = useRef<HTMLDivElement>(null);
  const violet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let cx = 0, cy = 0;
    let vx = 0, vy = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      // Cyan: faster lerp, follows more eagerly
      cx += (targetX - cx) * 0.04;
      cy += (targetY - cy) * 0.04;
      // Violet: slower lerp, lazier drift in opposite direction
      vx += (-targetX - vx) * 0.025;
      vy += (-targetY - vy) * 0.025;
      if (cyan.current) cyan.current.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (violet.current) violet.current.style.transform = `translate3d(${vx.toFixed(2)}px, ${vy.toFixed(2)}px, 0)`;
      const dx = Math.abs(targetX - cx) + Math.abs(-targetX - vx);
      const dy = Math.abs(targetY - cy) + Math.abs(-targetY - vy);
      if (dx < 0.1 && dy < 0.1) {
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      targetX = (e.clientX / w - 0.5) * 120;
      targetY = (e.clientY / h - 0.5) * 120;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -20 }}
    >
      {/* Deep violet blob — top-left */}
      <div
        ref={violet}
        className="absolute will-change-transform"
        style={{
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.50 0.30 295 / 0.55), oklch(0.50 0.30 295 / 0.18) 45%, transparent 70%)",
          filter: "blur(80px)",
          transition: "transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      />
      {/* Electric cyan blob — bottom-right */}
      <div
        ref={cyan}
        className="absolute will-change-transform"
        style={{
          bottom: "-20%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          maxWidth: "1000px",
          maxHeight: "1000px",
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.91 0.16 195 / 0.40), oklch(0.91 0.16 195 / 0.12) 45%, transparent 70%)",
          filter: "blur(90px)",
          transition: "transform 1.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      />
    </div>
  );
}