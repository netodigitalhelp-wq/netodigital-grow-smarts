import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact } from "@/lib/contact";
import {
  ArrowLeft,
  Sparkles,
  Bot,
  MessageSquare,
  Workflow,
  Clock,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Rocket,
  Brain,
  Zap,
  Send,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NetoDigital — סוכנות אוטומציה ו-AI לעסקים קטנים" },
      { name: "description", content: "הופכים את העסק שלך לאוטומטי עם AI: שיווק אוטונומי, בוטים לוואטסאפ ואופטימיזציה תפעולית. מקסימום תוצאות, מינימום מאמץ." },
      { property: "og:title", content: "NetoDigital — אוטומציה חכמה לעסקים קטנים" },
      { property: "og:description", content: "סוכנות AI Automation שעוזרת לעסקים קטנים בישראל לחסוך זמן, להגדיל לידים ולשרת לקוחות 24/7." },
    ],
  }),
  component: Index,
});

const painPoints = [
  { icon: TrendingDown, title: "נמאס לרדוף אחרי לידים?", desc: "לידים שמתפספסים, פולואפים שנשכחים, ולוח שנה ריק יותר ממה שתכננת." },
  { icon: Clock, title: "מבזבז שעות על פוסטים?", desc: "תוכן לרשתות זה עבודה במשרה מלאה — ועדיין לא רואים את התוצאות." },
  { icon: AlertCircle, title: "מאבד לקוחות בוואטסאפ?", desc: "הודעות שלא נענות בזמן = לקוחות שעוברים למתחרה. כל יום." },
];

const solutions = [
  {
    icon: Sparkles,
    title: "שיווק אוטונומי",
    tag: "Content & Graphics",
    desc: "מערכת AI שמייצרת תוכן, גרפיקה וקופי לרשתות החברתיות שלך — בקצב, באיכות ובסגנון של המותג שלך.",
    features: ["פוסטים שבועיים אוטומטיים", "עיצוב גרפי תואם מותג", "תזמון חכם לפי הקהל"],
  },
  {
    icon: MessageSquare,
    title: "שירות לקוחות 24/7",
    tag: "AI WhatsApp Bots",
    desc: "בוט חכם בוואטסאפ שעונה ללקוחות מיידית, מתאם פגישות, סוגר עסקאות ומעביר אליך רק את הלידים החמים.",
    features: ["מענה אנושי תוך שניות", "תיאום פגישות אוטומטי", "סינון לידים חכם"],
  },
  {
    icon: Workflow,
    title: "אופטימיזציה תפעולית",
    tag: "Workflow Automation",
    desc: "מחברים בין הכלים שלך — CRM, מיילים, חשבוניות, יומן — כך שכל תהליך פנימי יקרה בלחיצה אחת או בלי שום לחיצה.",
    features: ["אינטגרציה בין מערכות", "אוטומציה של פולואפים", "דוחות חכמים בזמן אמת"],
  },
];

const tiers = [
  {
    name: "Starter",
    tagline: "Basic AI",
    price: "החל מ-₪1,490",
    period: "לחודש",
    desc: "לעסק שרוצה להתחיל לטעום אוטומציה ולחסוך כמה שעות בשבוע.",
    features: [
      "בוט וואטסאפ בסיסי (FAQ + תיאום)",
      "יצירת תוכן AI ל-2 רשתות",
      "אוטומציית מיילים בסיסית",
      "תמיכה בצ'אט",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    tagline: "Custom Automation",
    price: "החל מ-₪3,490",
    period: "לחודש",
    desc: "לעסק צומח שצריך מערכת אוטומציה מותאמת אישית לכל התהליכים.",
    features: [
      "בוט AI מותאם עם זיכרון שיחה",
      "תוכן + גרפיקה ל-4 רשתות",
      "אינטגרציה עם CRM ויומן",
      "דשבורד ביצועים בזמן אמת",
      "ליווי אסטרטג בכיר",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "Full Business OS",
    price: "הצעה אישית",
    period: "",
    desc: "מערכת הפעלה שלמה לעסק — אוטומציה מקצה לקצה של שיווק, מכירות ותפעול.",
    features: [
      "מערכת AI מלאה בהתאמה אישית",
      "אינטגרציה עם כל המערכות",
      "סוכני AI אוטונומיים",
      "אסטרטג בכיר ייעודי",
      "SLA מענה 4 שעות",
    ],
    highlighted: false,
  },
];

function Index() {
  const [formState, setFormState] = useState({ name: "", business: "", challenge: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `שלום, אשמח ל-AI Audit חינמי 🙏%0A%0Aשם: ${formState.name}%0Aהעסק: ${formState.business}%0Aהאתגר: ${formState.challenge}`;
    const phone = contact.whatsappHref.split("/").pop()?.split("?")[0] ?? "972525981030";
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src={heroImg} alt="" width={1536} height={1024} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,oklch(0.55_0.24_295/0.25),transparent_60%)]" />
          </div>
          <div className="container mx-auto px-6 pt-24 pb-32 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur text-sm font-medium mb-8 animate-glow">
              <Brain className="w-4 h-4 text-primary" />
              סוכנות AI Automation לעסקים קטנים
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              הופכים את העסק שלך <br />
              <span className="text-gradient">לאוטומטי</span> — מקסימום תוצאות,<br className="hidden md:block" /> מינימום מאמץ
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              חוסכים לך עשרות שעות בחודש, מטפלים בלידים 24/7 ומגדילים את העסק עם AI מותאם אישית — בלי שתצטרך להבין שורת קוד.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#audit" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-elegant hover:scale-105 transition-smooth">
                AI Audit חינם <ArrowLeft className="w-4 h-4" />
              </a>
              <a href="#solutions" className="inline-flex items-center px-7 py-3.5 rounded-xl border border-border bg-card/50 backdrop-blur font-semibold hover:bg-card transition-smooth">
                איך זה עובד?
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> ללא התחייבות</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> תוצאות תוך 14 יום</div>
              <div className="hidden md:flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> ליווי אישי</div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-accent mb-3">מוכר לך?</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">העסק שלך עובד עליך — <br/>במקום בשבילך.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl bg-card/40 border border-destructive/20 hover:border-destructive/40 transition-smooth">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="container mx-auto px-6 mb-24 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary mb-3">הפתרון שלנו</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">3 מערכות AI שעובדות בשבילך 24/7</h2>
            <p className="text-muted-foreground text-lg">בנויות לעסקים קטנים — מותקנות תוך שבועיים.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(({ icon: Icon, title, tag, desc, features }) => (
              <div key={title} className="group p-7 rounded-2xl gradient-card border border-border/50 hover:border-primary/50 transition-smooth hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-md">{tag}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-6 mb-24 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary mb-3">חבילות</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">בחר את הקצב שמתאים לך</h2>
            <p className="text-muted-foreground text-lg">שקיפות מלאה. ללא חוזי שנה. אפשר לשדרג בכל שלב.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-2xl border transition-smooth flex flex-col ${
                  tier.highlighted
                    ? "gradient-card border-primary shadow-elegant scale-[1.02] md:scale-105"
                    : "bg-card/40 border-border/50 hover:border-primary/40"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold">
                    <Star className="w-3 h-3" /> הכי פופולרי
                  </div>
                )}
                <div className="mb-5">
                  <div className="text-sm font-mono text-accent mb-1">{tier.tagline}</div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="text-3xl font-extrabold text-gradient">{tier.price}</div>
                  {tier.period && <div className="text-sm text-muted-foreground mt-1">{tier.period}</div>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-smooth ${
                    tier.highlighted
                      ? "gradient-primary text-primary-foreground shadow-glow hover:scale-105"
                      : "border border-border bg-background hover:bg-secondary/50"
                  }`}
                >
                  בקש הצעת מחיר <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Magnet — Free AI Audit */}
        <section id="audit" className="container mx-auto px-6 mb-24 scroll-mt-24">
          <div className="relative overflow-hidden p-8 md:p-14 rounded-3xl gradient-hero border border-primary/30 shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.62_0.22_280/0.4),transparent_60%)]" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-4">
                  <Rocket className="w-3.5 h-3.5" /> חינם לחלוטין
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  AI Audit חינם <br/>
                  <span className="text-gradient">לעסק שלך</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  ספר לנו על העסק שלך — נחזיר לך תוך 24 שעות ניתוח אישי עם 3 הזדמנויות אוטומציה שיחסכו לך הכי הרבה זמן וכסף.
                </p>
                <ul className="space-y-2 text-sm">
                  {["ניתוח אישי ע״י אסטרטג בכיר", "3 הזדמנויות AI מותאמות לעסק שלך", "הערכת חיסכון בזמן ובעלויות", "ללא התחייבות, ללא שיחות מכירה"].map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={handleSubmit} className="bg-background/80 backdrop-blur rounded-2xl border border-border p-6 md:p-8 space-y-4">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">קיבלנו! 🎉</h3>
                    <p className="text-muted-foreground">פתחנו לך את וואטסאפ — שלח את ההודעה ונחזור אליך תוך 24 שעות.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor="name" className="text-sm font-medium block mb-1.5">השם שלך</label>
                      <input
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border focus:border-primary focus:outline-none transition-smooth"
                        placeholder="ישראל ישראלי"
                      />
                    </div>
                    <div>
                      <label htmlFor="business" className="text-sm font-medium block mb-1.5">סוג העסק</label>
                      <input
                        id="business"
                        required
                        value={formState.business}
                        onChange={(e) => setFormState({ ...formState, business: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border focus:border-primary focus:outline-none transition-smooth"
                        placeholder="קליניקה, חנות אונליין, מאמן..."
                      />
                    </div>
                    <div>
                      <label htmlFor="challenge" className="text-sm font-medium block mb-1.5">מה האתגר הכי גדול שלך כרגע?</label>
                      <textarea
                        id="challenge"
                        required
                        rows={3}
                        value={formState.challenge}
                        onChange={(e) => setFormState({ ...formState, challenge: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border focus:border-primary focus:outline-none transition-smooth resize-none"
                        placeholder="לדוגמה: לא מספיק לענות לכל הוואטסאפים..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-smooth"
                    >
                      <Send className="w-4 h-4" />
                      קבל את ה-Audit שלי
                    </button>
                    <p className="text-xs text-muted-foreground text-center">המידע שלך מאובטח. לא נשלח לך ספאם.</p>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 mb-24">
          <div className="text-center p-12 md:p-16 rounded-3xl gradient-card border border-border/50">
            <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">מוכן לתת ל-AI לעבוד בשבילך?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">דבר איתנו עכשיו בוואטסאפ — תקבל מענה תוך דקות.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth"
              >
                <Zap className="w-4 h-4" /> דבר איתנו עכשיו
              </a>
              <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-xl border border-border bg-card/50 font-semibold hover:bg-card transition-smooth">
                לכל דרכי התקשורת
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
