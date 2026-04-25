import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pulsating AI Orb — radial gradient (cyan → electric purple), breathing animation.
 * Sits absolutely behind the hero headline. Scales down on mobile via responsive sizing.
 */
export function AIOrb({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const c = core.current;
    if (!el || !c) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      tx = cx * 30;
      ty = cy * 24;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      c.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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
        "pointer-events-none absolute inset-0 flex items-center justify-center -z-10",
        className,
      )}
    >
      <div className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[560px] md:h-[560px]">
        {/* Outer breathing halo */}
        <div className="absolute inset-0 rounded-full gradient-orb animate-breathe" />
        {/* Slow rotating sheen ring */}
        <div
          className="absolute inset-[8%] rounded-full opacity-50 animate-orb-rotate"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, oklch(0.84 0.16 220 / 0.35) 25%, transparent 50%, oklch(0.55 0.27 295 / 0.4) 75%, transparent 100%)",
            filter: "blur(28px)",
          }}
        />
        {/* Inner core */}
        <div
          ref={core}
          className="absolute inset-[28%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, oklch(0.96 0.05 220 / 0.7), oklch(0.65 0.27 295 / 0.4) 50%, transparent 80%)",
            filter: "blur(18px)",
            transition: "transform 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}