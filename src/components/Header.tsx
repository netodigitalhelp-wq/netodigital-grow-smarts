import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { Magnetic } from "@/components/Magnetic";
import logoOrb from "@/assets/logo-orb.png";

const links = [
  { to: "/", label: "בית" },
  { to: "/services", label: "שירותים" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-[36px] sm:top-[40px] z-50 transition-all duration-500 overflow-visible ${
        scrolled
          ? "backdrop-blur-2xl bg-background/60 border-b border-accent/25 shadow-[0_8px_32px_-12px_oklch(0_0_0/0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-6 flex items-center justify-between overflow-visible transition-all duration-500 ${
          scrolled ? "h-14" : "h-16 md:h-20"
        }`}
      >
        {/* Morphing logo: full crystal logo → circular N-orb favicon when scrolled */}
        <Link to="/" aria-label="NetoDigital" className="relative flex items-center group" style={{ overflow: "visible" }}>
          <span
            className={`relative inline-block transition-all duration-500 ${
              scrolled
                ? "w-10 h-10 opacity-0 scale-75"
                : "h-[90px] md:h-[110px] w-auto opacity-100 scale-100 -mb-[20px] md:-mb-16"
            }`}
            style={{ transformOrigin: "right center", imageRendering: "-webkit-optimize-contrast" as React.CSSProperties["imageRendering"] }}
          >
            <LogoMark className="h-full" />
          </span>
          <span
            className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
              scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            }`}
          >
            <img
              src={logoOrb}
              alt="NetoDigital"
              draggable={false}
              className="w-10 h-10 rounded-full object-cover shadow-[0_0_18px_oklch(0.55_0.27_295/0.65),0_0_28px_oklch(0.84_0.16_220/0.45)] animate-orb-soft-pulse"
            />
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Magnetic key={l.to} strength={0.18} as="span">
              <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-secondary/50"
              activeProps={{ className: "px-4 py-2 text-sm text-foreground rounded-lg bg-secondary/50" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
              </Link>
            </Magnetic>
          ))}
        </nav>
        <Magnetic strength={0.28} as="span" className="hidden md:inline-block">
          <Link
            to="/contact"
            className="tactile photon inline-flex items-center px-5 py-2 text-sm font-bold gradient-cta text-accent-foreground rounded-lg cta-breathe hover:scale-105 transition-smooth"
          >
            התחל עכשיו
          </Link>
        </Magnetic>
        <button
          type="button"
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/60 hover:bg-secondary/50 transition-smooth"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-secondary/50"
                activeProps={{ className: "px-4 py-3 text-base text-foreground rounded-lg bg-secondary/50" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="tactile photon mt-2 inline-flex items-center justify-center px-5 py-3 text-base font-bold gradient-cta text-accent-foreground rounded-lg cta-breathe"
            >
              התחל עכשיו
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}