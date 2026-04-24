import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Megaphone, TrendingUp, BarChart3, Sparkles, Target, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "השירותים שלנו — NetoDigital" },
      { name: "description", content: "SEO, פרסום ממומן, ניהול רשתות חברתיות, בניית אתרים ואסטרטגיית שיווק לעסקים קטנים." },
      { property: "og:title", content: "שירותי שיווק דיגיטלי — NetoDigital" },
      { property: "og:description", content: "פתרונות שיווק דיגיטלי מקצה-לקצה לעסקים קטנים בישראל." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Search, title: "קידום אורגני (SEO)", desc: "אסטרטגיית SEO ארוכת טווח שמביאה תנועה איכותית מגוגל.", features: ["מחקר מילות מפתח", "אופטימיזציה טכנית", "כתיבת תוכן SEO", "בניית קישורים"] },
  { icon: Megaphone, title: "פרסום ממומן (PPC)", desc: "קמפיינים ב-Google Ads, Meta ו-TikTok שמייצרים לידים.", features: ["ניהול תקציב חכם", "A/B Testing מתמיד", "קריאייטיב ממיר", "אופטימיזציה יומית"] },
  { icon: TrendingUp, title: "רשתות חברתיות", desc: "ניהול קהילה, תוכן ויזואלי ופרסום באינסטגרם ופייסבוק.", features: ["תוכנית תוכן חודשית", "צילום ועריכה", "ניהול קהילה", "דוחות חודשיים"] },
  { icon: BarChart3, title: "ניתוח נתונים", desc: "מעקב מדויק אחר כל מסע לקוח עם GA4 ו-dashboards מותאמים.", features: ["הטמעת מעקב", "דשבורדים בזמן אמת", "ניתוח התנהגות", "המלצות לאופטימיזציה"] },
  { icon: Sparkles, title: "בניית אתרים", desc: "אתרי תדמית וחנויות מקוונות מהירים, יפים וממירים.", features: ["עיצוב מותאם אישית", "מהירות טעינה גבוהה", "התאמה מלאה למובייל", "אופטימיזציה להמרות"] },
  { icon: Target, title: "אסטרטגיה ויעוץ", desc: "תוכנית עבודה שיווקית מקיפה שמתאימה למטרות שלכם.", features: ["מחקר שוק", "אפיון קהל יעד", "מפת דרכים שיווקית", "ליווי שוטף"] },
];

function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-20 pb-12 text-center max-w-3xl">
          <div className="text-sm font-semibold text-primary mb-3">השירותים שלנו</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">פתרונות שיווק <span className="text-gradient">מקצה לקצה</span></h1>
          <p className="text-lg text-muted-foreground">בחרו את השירות שהכי מתאים לכם, או שנשלב כמה לאסטרטגיה כוללת.</p>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, title, desc, features }) => (
              <div key={title} className="p-8 rounded-2xl gradient-card border border-border/50 hover:border-primary/50 transition-smooth">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <ul className="space-y-2 pt-4 border-t border-border/50">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
              לקבלת הצעת מחיר <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}