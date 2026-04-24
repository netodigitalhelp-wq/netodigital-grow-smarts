import { Link } from "@tanstack/react-router";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-24">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Neto<span className="text-gradient">Digital</span></span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            סוכנות שיווק דיגיטלי המתמחה בעסקים קטנים. אנחנו הופכים נוכחות מקוונת להכנסות אמיתיות.
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
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" />hello@netodigital.co.il</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" />03-555-1234</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" />תל אביב, ישראל</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NetoDigital. כל הזכויות שמורות.
      </div>
    </footer>
  );
}