import { cn } from "@/lib/utils";

/**
 * Pulsating AI Orb — radial gradient (cyan → electric purple), breathing animation.
 * Sits absolutely behind the hero headline. Scales down on mobile via responsive sizing.
 */
export function AIOrb({ className }: { className?: string }) {
  return (
    <div
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
          className="absolute inset-[28%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, oklch(0.96 0.05 220 / 0.7), oklch(0.65 0.27 295 / 0.4) 50%, transparent 80%)",
            filter: "blur(18px)",
          }}
        />
      </div>
    </div>
  );
}