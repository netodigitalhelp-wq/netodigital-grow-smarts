import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.png";
import heroOrb from "@/assets/hero-orb.png";
import heroFigure from "@/assets/hero-figure.png";
import { cn } from "@/lib/utils";

/**
 * Layered hero composition.
 *  Layer 0: hero-bg.png — full-bleed background.
 *  Layer 1: hero-orb.png — left-anchored, mouse-follow + soft pulse.
 *  Layer 2: hero-figure.png — over orb, glitch reveal then continuous floating.
 */
export function HeroComposition({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const orb = useRef<HTMLDivElement>(null);
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
      tx = cx * 36;
      ty = cy * 28;
    };
    const tick = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      o.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      f.style.transform = `translate3d(${x * 0.55}px, ${y * 0.55}px, 0)`;
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
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Layer 1 — Orb (left), mouse-follow + soft pulse */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-[5%] sm:left-[8%] flex items-center justify-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div
          ref={orb}
          className="relative will-change-transform animate-orb-soft-pulse"
          style={{ transition: "transform 0.1s linear" }}
        >
          {/* Glow halo behind orb */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.27 295 / 0.65), oklch(0.84 0.16 220 / 0.35) 50%, transparent 75%)",
              transform: "scale(1.1)",
            }}
          />
          <img
            src={heroOrb}
            alt=""
            draggable={false}
            className="block w-[220px] sm:w-[300px] md:w-[380px] lg:w-[460px] h-auto select-none"
          />
        </div>
      </div>

      {/* Layer 2 — AI Figure over orb, glitch reveal + floating */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-[5%] sm:left-[8%] flex items-center justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div
          ref={figure}
          className={cn(
            "relative will-change-transform animate-figure-float",
            revealed ? "" : "",
          )}
          style={{ transition: "transform 0.1s linear" }}
        >
          {/* Base figure */}
          <img
            src={heroFigure}
            alt=""
            draggable={false}
            className={cn(
              "block w-[240px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto select-none",
              "transition-[opacity,filter] duration-[1600ms] ease-out",
              revealed ? "opacity-100 blur-0" : "opacity-0 blur-[18px]",
            )}
          />
          {/* Glitch RGB split layers — only visible during reveal */}
          <img
            src={heroFigure}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-[1400ms]",
              revealed ? "opacity-0" : "opacity-70",
            )}
            style={{ filter: "hue-rotate(90deg) blur(4px)", transform: "translate(5px, -2px)" }}
          />
          <img
            src={heroFigure}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-[1400ms]",
              revealed ? "opacity-0" : "opacity-60",
            )}
            style={{ filter: "hue-rotate(-90deg) blur(4px)", transform: "translate(-5px, 2px)" }}
          />
          {/* Particle scan lines during reveal */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-[1400ms]",
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

      {/* Right-side fade so RTL text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 25 }}
      >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, oklch(0.10 0.025 260) 0%, oklch(0.10 0.025 260 / 0.82) 38%, oklch(0.10 0.025 260 / 0.25) 70%, transparent 100%)",
        }}
      />
      {/* Top/bottom subtle fade for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.10 0.025 260 / 0.45), transparent 25%, transparent 75%, oklch(0.10 0.025 260 / 0.7))",
        }}
      />
      </div>
    </div>
  );
}