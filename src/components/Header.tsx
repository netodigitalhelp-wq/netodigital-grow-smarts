import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-icon.png";

const links = [
  { to: "/", label: "בית" },
  { to: "/services", label: "שירותים" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-[36px] sm:top-[40px] z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="NetoDigital - צמיחה לעסקים קטנים"
            className="h-10 w-10 object-contain group-hover:scale-110 transition-smooth"
          />
          <span className="text-xl font-bold tracking-tight">
            Neto<span className="text-gradient">Digital</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-secondary/50"
              activeProps={{ className: "px-4 py-2 text-sm text-foreground rounded-lg bg-secondary/50" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold gradient-primary text-primary-foreground rounded-lg shadow-glow hover:scale-105 transition-smooth"
        >
          התחל עכשיו
        </Link>
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
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-base font-semibold gradient-primary text-primary-foreground rounded-lg shadow-glow"
            >
              התחל עכשיו
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}