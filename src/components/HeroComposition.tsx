import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.png";
import heroOrb from "@/assets/hero-orb.png";
import heroFigure from "@/assets/hero-figure.png";
import { cn } from "@/lib/utils";

/**
 * Layered hero composition — forced absolute positioning.
 *  Layer 0: hero-bg.png — full-bleed background (z-index 0).
 *  Layer 1: hero-orb.png — left-anchored, mouse-follow ±20px (z-index 10).
 *  Layer 2: hero-figure.png — over orb, glitch reveal then floating (z-index 20).
 *  Right-side fade veil sits at z-index 5 so it darkens the bg but stays BEHIND
 *  the orb + figure — the assets must remain fully visible.
 */
export function HeroComposition({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const orb = useRef<HTMLImageElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const o = orb.current;
    const f = figure.current;
    if (!el || !o || !f) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      tx = cx * 40; // ±20px
      ty = cy * 40;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      // Figure: bottom-anchored, subtle parallax (factor 0.02 → ±0.4px of cx*40 → use 0.5 multiplier ≈ ±10px)
      const fx = x * 0.5;
      const fy = y * 0.5;
      // Orb: top-anchored, lighter parallax
      const ox = x * 0.3;
      const oy = y * 0.3;
      o.style.transform = `translate(${ox}px, ${oy}px) scale(1)`;
      f.style.transform = `translate(${fx}px, ${fy}px) scale(1)`;
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
      {/* Layer 0 — full-bleed background */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Right-side dark veil — sits BEHIND assets so they remain crisp */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 5,
          background:
            "linear-gradient(to left, oklch(0.10 0.025 260) 0%, oklch(0.10 0.025 260 / 0.78) 40%, oklch(0.10 0.025 260 / 0.20) 72%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          zIndex: 5,
          background:
            "linear-gradient(to bottom, oklch(0.10 0.025 260 / 0.45), transparent 25%, transparent 75%, oklch(0.10 0.025 260 / 0.7))",
        }}
      />

      {/* Layer 1 — Orb (blurred, behind figure) */}
      <img
        ref={orb}
        src={heroOrb}
        alt=""
        draggable={false}
        className="animate-orb-soft-pulse select-none"
        style={{
          position: "absolute",
          left: "-5%",
          top: "20%",
          transform: "translateY(0) scale(1)",
          zIndex: 5,
          width: "40%",
          maxWidth: "550px",
          height: "auto",
          opacity: 0.5,
          mixBlendMode: "screen",
          filter:
            "blur(5px) brightness(1.15) contrast(1.1) drop-shadow(0 0 36px oklch(0.55 0.27 295 / 0.55)) drop-shadow(0 0 60px oklch(0.84 0.16 220 / 0.35))",
        }}
      />

      {/* Layer 2 — Holographic AI Figure (anchored bottom-left) */}
      <div
        ref={figure}
        style={{
          position: "absolute",
          left: "0",
          bottom: "0",
          top: "auto",
          transform: "translate(0,0) scale(1)",
          zIndex: 10,
          width: "55%",
          maxWidth: "750px",
          opacity: 0.75,
          background: "transparent",
          mixBlendMode: "screen",
          filter:
            "brightness(1.1) contrast(1.1) drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))",
        }}
      >
        <div className="relative w-full animate-figure-float">
          <img
            src={heroFigure}
            alt=""
            draggable={false}
            className={cn(
              "block w-full h-auto select-none transition-[opacity,filter,transform] duration-[1200ms] ease-out",
              revealed ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[14px] scale-90",
            )}
          />
          {/* Glitch RGB split layers — visible only during reveal */}
          <img
            src={heroFigure}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-[1200ms]",
              revealed ? "opacity-0" : "opacity-70",
            )}
            style={{ filter: "hue-rotate(90deg) blur(4px)", transform: "translate(5px, -2px)" }}
          />
          <img
            src={heroFigure}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-[1200ms]",
              revealed ? "opacity-0" : "opacity-60",
            )}
            style={{ filter: "hue-rotate(-90deg) blur(4px)", transform: "translate(-5px, 2px)" }}
          />
          {/* Scan lines during reveal */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]",
              revealed ? "opacity-0" : "opacity-90",
            )}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, oklch(0.95 0.05 220 / 0.12) 0 1px, transparent 1px 4px)",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>
    </div>
  );
}
