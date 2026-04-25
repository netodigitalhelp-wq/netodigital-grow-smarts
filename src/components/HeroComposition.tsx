import { useEffect, useRef, useState } from "react";
import heroBgVideo from "@/assets/hero-bg.mp4";
import heroEntityVideo from "@/assets/hero-entity.mp4";
import heroOverlayVideo from "@/assets/hero-overlay.mp4";
import { cn } from "@/lib/utils";

/**
 * Tri-Layer Video Hero Composition — Luxury Edit
 *  Layer 1: hero-bg.mp4 — fluid atmosphere (color-dodge, 0.3)
 *  Layer 2: hero-entity.mp4 — main AI entity (plus-lighter, radial mask, cyan glow)
 *  Layer 3: hero-overlay.mp4 — detail texture (screen, blur 15px)
 *  + SVG sharpen filter, animated grain, inset vignette, edge-soften masks.
 */
export function HeroComposition({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    videoRefs.forEach((r) => {
      if (r.current) r.current.playbackRate = 0.5;
    });
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const s = stage.current;
    if (!el || !s) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      tx = cx * 30;
      ty = cy * 30;
      s.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const polishFilter =
    "url(#hero-sharpen) contrast(1.1) brightness(1.05) saturate(1.1)";

  const edgeMask =
    "radial-gradient(circle, black 40%, transparent 95%)";

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
    >
      {/* Inline SVG defs: sharpen convolution + animated grain turbulence */}
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id="hero-sharpen">
            <feConvolveMatrix
              order="3"
              preserveAlpha="true"
              kernelMatrix="0 -0.4 0  -0.4 2.6 -0.4  0 -0.4 0"
            />
          </filter>
          <filter id="hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            >
              <animate
                attributeName="seed"
                from="1"
                to="60"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.4" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div
        ref={stage}
        className="absolute inset-0 will-change-transform"
        style={{
          opacity: revealed ? 1 : 0,
          transition:
            "opacity 3000ms ease-out, transform 1500ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        }}
      >
        {/* Aspect-locked video container — prevents stretching on ultrawide */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            // Inset vignette: hides any visible video box edges
            boxShadow: "inset 0 0 100px 50px rgba(2, 6, 23, 1)",
          }}
        >
          {/* Layer 1 — Background fluid atmosphere */}
          <video
            ref={videoRefs[0]}
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
              opacity: 0.3,
              mixBlendMode: "color-dodge",
              filter: polishFilter,
              WebkitMaskImage: edgeMask,
              maskImage: edgeMask,
            }}
          />

          {/* Layer 2 — Main AI entity (metamorphosis) */}
          <video
            ref={videoRefs[1]}
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
              filter:
                "url(#hero-sharpen) contrast(1.15) brightness(1.1) saturate(1.15) drop-shadow(0 0 15px rgba(0, 255, 255, 0.4))",
              WebkitMaskImage: edgeMask,
              maskImage: edgeMask,
            }}
          />

          {/* Layer 3 — Detail & texture overlay */}
          <video
            ref={videoRefs[2]}
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
              filter: `${polishFilter} blur(15px)`,
              pointerEvents: "none",
            }}
          />

          {/* Animated film grain — luxury secret */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 20,
              opacity: 0.03,
              filter: "url(#hero-grain)",
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Right-side dark veil — keeps text readable on the right column */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 25,
            background:
              "linear-gradient(to left, oklch(0.10 0.025 260) 0%, oklch(0.10 0.025 260 / 0.78) 40%, oklch(0.10 0.025 260 / 0.20) 72%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 25,
            background:
              "linear-gradient(to bottom, oklch(0.10 0.025 260 / 0.45), transparent 25%, transparent 75%, oklch(0.10 0.025 260 / 0.7))",
          }}
        />
      </div>
    </div>
  );
}
