import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-icon.png";

const links = [
  { to: "/", label: "בית" },
  { to: "/services", label: "שירותים" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
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
      </div>
    </header>
  );
}