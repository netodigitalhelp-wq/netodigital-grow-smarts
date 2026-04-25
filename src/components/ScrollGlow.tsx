import { useEffect, useState } from "react";

/**
 * Fixed-position background glow that transitions from Electric Cyan (#00D4FF)
 * at the top of the page to Deep Purple (#7B2CBF) as the user scrolls past
 * the hero. Sits behind all content (-z-10) and ignores pointer events.
 */
export function ScrollGlow() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = Math.max(1, window.innerHeight * 1.5);
        const ratio = Math.min(1, Math.max(0, window.scrollY / max));
        setT(ratio);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Cyan → Purple. Hue interpolation in oklch space (220 → 295).
  const hue = 220 + (295 - 220) * t;
  const chroma = 0.16 + (0.25 - 0.16) * t;
  const lightness = 0.7 - 0.15 * t;
  const color = `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(1)} / 0.28)`;
  // Position glow drifts down a little as you scroll
  const top = 10 + 20 * t;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none transition-[background] duration-300"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% ${top}%, ${color}, transparent 70%)`,
      }}
    />
  );
}