import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.png";
import { cn } from "@/lib/utils";

/**
 * "Digital Particle Reveal" hero image. Renders the hero background with a
 * staged reveal: blur + glitch RGB split fades out as the image materialises.
 * Mouse parallax: the inner image subtly follows the cursor.
 */
export function HeroParticleImage({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const img = inner.current;
    if (!el || !img) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      tx = cx * 18;
      ty = cy * 14;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      img.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`;
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
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div
        ref={inner}
        className={cn(
          "absolute inset-0 will-change-transform transition-[opacity,filter] duration-[1600ms] ease-out",
          revealed ? "opacity-100 blur-0" : "opacity-0 blur-[24px]",
        )}
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Glitch RGB split layers — only visible during reveal */}
      <div
        className={cn(
          "absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-[1400ms]",
          revealed ? "opacity-0" : "opacity-70",
        )}
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          filter: "hue-rotate(90deg) blur(6px)",
          transform: "translate(6px, -2px)",
        }}
      />
      <div
        className={cn(
          "absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-[1400ms]",
          revealed ? "opacity-0" : "opacity-60",
        )}
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          filter: "hue-rotate(-90deg) blur(6px)",
          transform: "translate(-6px, 2px)",
        }}
      />
      {/* Particle scan lines during reveal */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-[1400ms]",
          revealed ? "opacity-0" : "opacity-90",
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.95 0.05 220 / 0.10) 0 1px, transparent 1px 4px)",
          mixBlendMode: "overlay",
        }}
      />
      {/* Right-side fade so text on the right stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, oklch(0.10 0.025 260) 0%, oklch(0.10 0.025 260 / 0.85) 35%, oklch(0.10 0.025 260 / 0.30) 70%, transparent 100%)",
        }}
      />
      {/* Top/bottom subtle fade for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.10 0.025 260 / 0.45), transparent 25%, transparent 75%, oklch(0.10 0.025 260 / 0.7))",
        }}
      />
    </div>
  );
}