import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, TrendingUp, Search, Megaphone, BarChart3, Sparkles, Target, Rocket, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NetoDigital — שיווק וקידום דיגיטלי לעסקים קטנים" },
      { name: "description", content: "סוכנות שיווק דיגיטלי לעסקים קטנים. קידום אורגני, פרסום ממומן, ניהול רשתות חברתיות ובניית אתרים שמייצרים תוצאות." },
      { property: "og:title", content: "NetoDigital — שיווק דיגיטלי שמייצר תוצאות" },
      { property: "og:description", content: "מגדילים את העסק שלך באינטרנט עם אסטרטגיית שיווק דיגיטלי חכמה ומותאמת אישית." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Search, title: "קידום אורגני (SEO)", desc: "מובילים את העסק שלך לעמוד הראשון בגוגל עם אסטרטגיית SEO מנצחת." },
  { icon: Megaphone, title: "פרסום ממומן", desc: "קמפיינים ב-Google Ads ו-Meta שמביאים לידים איכותיים בעלות נמוכה." },
  { icon: TrendingUp, title: "ניהול רשתות חברתיות", desc: "תוכן יצירתי וקהילה פעילה באינסטגרם, פייסבוק וטיקטוק." },
  { icon: BarChart3, title: "ניתוח נתונים", desc: "מדידה מדויקת של כל שקל שיווקי כדי למקסם החזר השקעה." },
  { icon: Sparkles, title: "בניית אתרים", desc: "אתרים מהירים, יפים ומותאמים להמרות ומובייל." },
  { icon: Target, title: "אסטרטגיית שיווק", desc: "תוכנית עבודה ברורה שמתאימה לתקציב ולמטרות שלך." },
];

const stats = [
  { value: "+250", label: "עסקים מרוצים" },
  { value: "98%", label: "שיעור שימור" },
  { value: "x4.2", label: "ROI ממוצע" },
  { value: "8 שנים", label: "ניסיון בשטח" },
];

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src={heroImg} alt="" width={1536} height={1024} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>
          <div className="container mx-auto px-6 pt-24 pb-32 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur text-sm text-muted-foreground mb-8 animate-glow">
              <Sparkles className="w-4 h-4 text-primary" />
              סוכנות שיווק דיגיטלי לעסקים קטנים
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
              שיווק דיגיטלי <br />
              שמביא <span className="text-gradient">לקוחות אמיתיים</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              ב-NetoDigital אנחנו עוזרים לעסקים קטנים בישראל לצמוח באינטרנט — בעזרת אסטרטגיה חכמה, פרסום מדויק ותוצאות מדידות.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-elegant hover:scale-105 transition-smooth">
                נתחיל לעבוד יחד <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center px-7 py-3.5 rounded-xl border border-border bg-card/50 backdrop-blur font-semibold hover:bg-card transition-smooth">
                לשירותים שלנו
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-6 -mt-12 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl gradient-card border border-border/50 shadow-elegant">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary mb-3">השירותים שלנו</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">כל מה שצריך כדי לצמוח דיגיטלית</h2>
            <p className="text-muted-foreground text-lg">פתרונות שיווק מקצה-לקצה תחת קורת גג אחת.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-7 rounded-2xl gradient-card border border-border/50 hover:border-primary/50 transition-smooth hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-smooth">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center p-10 md:p-16 rounded-3xl gradient-card border border-border/50">
            <div>
              <div className="text-sm font-semibold text-primary mb-3">למה NetoDigital</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">שותפים לצמיחה, לא רק ספק.</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                אנחנו מבינים שכל שקל בעסק קטן חשוב. לכן אנחנו עובדים בשקיפות מלאה, עם דוחות חודשיים ברורים ויעדים מדידים.
              </p>
              <ul className="space-y-3">
                {["ליווי אישי וצמוד", "תוצאות תוך 60 יום", "ללא התחייבות לטווח ארוך", "צוות מומחים בישראל"].map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 gradient-primary blur-3xl opacity-30 rounded-full" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-background/80 border border-border animate-float">
                  <Rocket className="w-8 h-8 text-primary mb-3" />
                  <div className="text-2xl font-bold">+340%</div>
                  <div className="text-sm text-muted-foreground">תנועה לאתר</div>
                </div>
                <div className="p-6 rounded-2xl bg-background/80 border border-border animate-float mt-8" style={{ animationDelay: "1s" }}>
                  <Target className="w-8 h-8 text-accent mb-3" />
                  <div className="text-2xl font-bold">-58%</div>
                  <div className="text-sm text-muted-foreground">עלות ליד</div>
                </div>
                <div className="p-6 rounded-2xl bg-background/80 border border-border animate-float" style={{ animationDelay: "0.5s" }}>
                  <TrendingUp className="w-8 h-8 text-primary mb-3" />
                  <div className="text-2xl font-bold">x5.1</div>
                  <div className="text-sm text-muted-foreground">המרות</div>
                </div>
                <div className="p-6 rounded-2xl bg-background/80 border border-border animate-float mt-8" style={{ animationDelay: "1.5s" }}>
                  <BarChart3 className="w-8 h-8 text-accent mb-3" />
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">שביעות רצון</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-24">
          <div className="text-center p-12 md:p-20 rounded-3xl gradient-hero border border-primary/30 shadow-elegant relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.62_0.22_280/0.4),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">מוכנים להתחיל לצמוח?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">קבעו שיחת ייעוץ חינמית של 30 דקות וקבלו אסטרטגיה ראשונית מותאמת לעסק שלכם.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
                לקביעת שיחה <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
