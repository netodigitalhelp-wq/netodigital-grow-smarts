import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessageCircle, Sparkles, BarChart3, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "השירותים שלנו — NetoDigital" },
      { name: "description", content: "סוכני AI לוואטסאפ, ניהול תוכן אוטומטי ומערכת לידים חכמה — עובדים דיגיטליים 24/7 לעסקים." },
      { property: "og:title", content: "שירותי AI Automation — NetoDigital" },
      { property: "og:description", content: "עובדים דיגיטליים שעובדים בשבילך 24/7 — בלי שתצטרך להבין כלום טכני." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: MessageCircle,
    badge: "הפופולרי ביותר",
    title: "סוכן וואטסאפ אוטונומי",
    desc: "סוכן AI שעונה ללקוחות שלך בוואטסאפ תוך שניות — מתאם פגישות, עונה על שאלות, וסוגר עסקאות. גם בשעה 2 לילה.",
    features: [
      "מענה אוטומטי 24/7",
      "תיאום פגישות ללא מגע יד אדם",
      "סינון לידים חמים בלבד",
      "שיחה שנשמעת אנושית לחלוטין",
    ],
  },
  {
    icon: Sparkles,
    title: "מנהל תוכן AI",
    desc: "פוסטים, סטוריז וגרפיקה שיוצאים כל שבוע בסגנון המותג שלך — אוטומטית, בלי שתחשוב על זה.",
    features: [
      "פוסטים שבועיים אוטומטיים",
      "גרפיקה מותאמת למותג",
      "תזמון חכם לפי הקהל",
      "כיסוי של עד 2 רשתות חברתיות",
    ],
  },
  {
    icon: BarChart3,
    title: "מערכת לידים חכמה",
    desc: "כל ליד מפייסבוק וגוגל מקבל מענה תוך 60 שניות, מדורג לפי חום, ומקבל פולואפ אוטומטי — אפס לידים אבודים.",
    features: [
      "חיבור ישיר ממודעות → CRM",
      "דירוג ותעדוף לידים אוטומטי",
      "פולואפים אוטומטיים",
      "אפס לידים שנופלים בין הכסאות",
    ],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-20 pb-12 text-center max-w-3xl">
          <div className="text-sm font-semibold text-primary mb-3">השירותים שלנו</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">השירותים <span className="text-gradient">שלנו</span></h1>
          <p className="text-lg text-muted-foreground">עובדים דיגיטליים שעובדים בשבילך 24/7 — בלי שתצטרך להבין כלום טכני.</p>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, features, badge }) => (
              <div key={title} className="relative p-8 rounded-2xl gradient-card border border-border/50 hover:border-primary/50 transition-smooth">
                {badge && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold gradient-primary text-primary-foreground shadow-glow">
                    {badge}
                  </div>
                )}
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

          <div className="mt-20 p-10 md:p-14 rounded-3xl gradient-card border border-border/50 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">לא בטוחים איזה שירות מתאים לכם?</h2>
            <p className="text-lg text-muted-foreground mb-8">ענו על 5 שאלות קצרות וקבלו המלצה אישית חינם.</p>
            <Link to="/" hash="audit" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
              התחילו אבחון AI חינם <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}