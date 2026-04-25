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
      // Complimentary parallax: figure leads (0.02 ≈ full ±20px), orb trails (0.01 ≈ ±10px).
      // Both move in the same direction so the orb reads as a steady energy source behind the figure.
      o.style.transform = `translate(${x * 0.5}px, calc(-50% + ${y * 0.5}px))`;
      f.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
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

      {/* Solid-black backplate behind assets — guarantees `screen` blend drops the
          checkered gray pixels of image_2 / image_0 to pure transparency. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "0%",
          top: "0%",
          width: "55%",
          height: "100%",
          zIndex: 8,
          background: "#000000",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 30% 50%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 30% 50%, #000 55%, transparent 100%)",
        }}
      />

      {/* Layer 1 — Orb (forced absolute, ALWAYS visible) */}
      <img
        ref={orb}
        src={heroOrb}
        alt=""
        draggable={false}
        className="animate-orb-soft-pulse select-none"
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "45%",
          maxWidth: "500px",
          height: "auto",
          opacity: 1,
          mixBlendMode: "screen",
          filter:
            "contrast(1.1) brightness(1.1) drop-shadow(0 0 36px oklch(0.55 0.27 295 / 0.65)) drop-shadow(0 0 60px oklch(0.84 0.16 220 / 0.4))",
        }}
      />

      {/* Layer 2 — AI Figure stack (reveal + glitch + float) */}
      <div
        ref={figure}
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: "40%",
          maxWidth: "500px",
          opacity: 1,
          mixBlendMode: "screen",
          filter: "contrast(1.1) brightness(1.1)",
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
