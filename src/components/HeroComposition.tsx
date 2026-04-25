import { useEffect, useRef } from "react";
import heroBgVideo from "@/assets/hero-bg.mp4";
import heroEntityVideo from "@/assets/hero-entity.mp4";
import heroOverlayVideo from "@/assets/hero-overlay.mp4";
import { cn } from "@/lib/utils";

/**
 * Tri-Layer Video Hero Composition
 *  Layer 1: hero-bg.mp4 — fluid atmosphere (z-index 5, color-dodge, 0.4 opacity)
 *  Layer 2: hero-entity.mp4 — main AI entity (z-index 10, plus-lighter, radial mask)
 *  Layer 3: hero-overlay.mp4 — detail texture (z-index 15, screen, 0.25 opacity, blur 8px)
 *  + Mouse-follow parallax (±15px) on the whole container.
 */
export function HeroComposition({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const s = stage.current;
    if (!el || !s) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      tx = cx * 30; // ±15px
      ty = cy * 30;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      s.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
    >
      <div ref={stage} className="absolute inset-0 will-change-transform">
        {/* Layer 1 — Background fluid atmosphere */}
        <video
          src={heroBgVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 5,
            opacity: 0.4,
            mixBlendMode: "color-dodge",
          }}
        />

        {/* Layer 2 — Main AI entity (metamorphosis) */}
        <video
          src={heroEntityVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 10,
            mixBlendMode: "plus-lighter",
            filter: "brightness(1.2) contrast(1.1)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 60%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at center, black 60%, transparent 100%)",
          }}
        />

        {/* Layer 3 — Detail & texture overlay */}
        <video
          src={heroOverlayVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "-5%",
            left: "-5%",
            width: "110%",
            height: "110%",
            objectFit: "cover",
            zIndex: 15,
            mixBlendMode: "screen",
            opacity: 0.25,
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        {/* Right-side dark veil — keeps text readable on the right column */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 20,
            background:
              "linear-gradient(to left, oklch(0.10 0.025 260) 0%, oklch(0.10 0.025 260 / 0.78) 40%, oklch(0.10 0.025 260 / 0.20) 72%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 20,
            background:
              "linear-gradient(to bottom, oklch(0.10 0.025 260 / 0.45), transparent 25%, transparent 75%, oklch(0.10 0.025 260 / 0.7))",
          }}
        />
      </div>
    </div>
  );
}
