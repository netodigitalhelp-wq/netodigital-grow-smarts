import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { contact } from "@/lib/contact";
import { LogoMark } from "@/components/LogoMark";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-24">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="mb-4">
            <LogoMark className="h-10" />
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            סוכנות AI & Automation לעסקים קטנים. בונים לכם "עובדים דיגיטליים" שמטפלים במכירות, שירות ותוכן — 24/7.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">ניווט</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-smooth">בית</Link></li>
            <li><Link to="/services" className="hover:text-foreground transition-smooth">שירותים</Link></li>
            <li><Link to="/about" className="hover:text-foreground transition-smooth">אודות</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-smooth">צור קשר</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">צור קשר</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={contact.emailHref} className="flex items-center gap-2 hover:text-foreground transition-smooth">
                <Mail className="w-4 h-4" />{contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-foreground transition-smooth" dir="ltr">
                <Phone className="w-4 h-4" />{contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" />{contact.area}</li>
            <li>
              <Link to="/privacy" className="hover:text-foreground transition-smooth text-xs">מדיניות פרטיות</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NetoDigital. כל הזכויות שמורות.
      </div>
    </footer>
  );
}