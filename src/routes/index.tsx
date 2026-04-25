import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact } from "@/lib/contact";
import {
  ArrowLeft,
  ArrowRight,
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
  Cpu,
  PiggyBank,
  Gauge,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NetoDigital — אוטומציה ו-AI לעסקים קטנים | עד 40% פחות מהשוק" },
      { name: "description", content: "סוכנות AI Automation לעסקים קטנים. שיווק אוטונומי, נציג AI בוואטסאפ ואוטומציית מכירות — במחירים חסרי תקדים, עד 40% פחות מהשוק." },
      { property: "og:title", content: "NetoDigital — אוטומציה ו-AI במחירים חסרי תקדים" },
      { property: "og:description", content: "חבילות AI Automation החל מ-150₪ לחודש. שיווק, שירות לקוחות 24/7 ואוטומציית מכירות לעסקים קטנים בישראל." },
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
    setup: "950₪",
    monthly: "150₪",
    highlight: "הפתרון המושלם לשיווק אוטומטי",
    desc: "לעסק שרוצה להתחיל לחסוך זמן על תוכן ושיווק.",
    features: [
      "יצירת תוכן AI ל-2 רשתות",
      "תזמון פוסטים אוטומטי",
      "תבניות גרפיות מותאמות מותג",
      "תמיכה בצ'אט",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    setup: "1,600₪",
    monthly: "250₪",
    highlight: "נציג AI חכם בוואטסאפ שלכם",
    desc: "לעסק שמקבל פניות בוואטסאפ ורוצה לסגור יותר עסקאות.",
    features: [
      "כל מה שכלול ב-Starter",
      "בוט AI מותאם בוואטסאפ",
      "מענה אוטומטי 24/7",
      "תיאום פגישות ביומן",
      "סינון לידים חכם",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    setup: "3,200₪",
    monthly: "450₪",
    highlight: "אוטומציה מלאה של תהליכי המכירה",
    desc: "לעסק שרוצה מערכת מכירות אוטונומית מקצה לקצה.",
    features: [
      "כל מה שכלול ב-Business",
      "אינטגרציה מלאה עם CRM",
      "אוטומציה של פולואפים",
      "דשבורד ביצועים בזמן אמת",
      "אסטרטג בכיר ייעודי",
      "SLA מענה 4 שעות",
    ],
    highlighted: false,
  },
];

const whyCheaper = [
  { icon: Cpu, title: "כלי AI רזים", desc: "אנחנו בונים על תשתיות AI מודרניות שעולות פחות מהפתרונות הישנים שסוכנויות גדולות עדיין משתמשות בהן." },
  { icon: Gauge, title: "תהליכים אוטומטיים", desc: "אנחנו עצמנו עובדים עם אוטומציה — כך שאנחנו צריכים פחות אנשים ופחות שעות כדי לתת לך תוצאה." },
  { icon: PiggyBank, title: "מעבירים לך את החיסכון", desc: "במקום לגלגל את החיסכון לרווח, אנחנו מורידים את המחיר. ככה אנחנו זוכים בלקוחות מרוצים שנשארים לטווח ארוך." },
];

const auditQuestions = [
  {
    id: "businessType",
    label: "מה סוג העסק שלך?",
    placeholder: "לדוגמה: קליניקה, חנות אונליין, מאמן אישי...",
    type: "text" as const,
  },
  {
    id: "leadsPerMonth",
    label: "כמה לידים/פניות אתה מקבל בחודש?",
    type: "choice" as const,
    options: ["פחות מ-20", "20-100", "100-500", "מעל 500"],
  },
  {
    id: "biggestChallenge",
    label: "מה האתגר הכי גדול שלך כרגע?",
    placeholder: "לדוגמה: לא מספיק זמן לענות לוואטסאפים...",
    type: "textarea" as const,
  },
  {
    id: "currentTools",
    label: "באילו כלים אתה משתמש היום?",
    placeholder: "לדוגמה: אקסל, וואטסאפ, אינסטגרם...",
    type: "text" as const,
  },
  {
    id: "name",
    label: "מעולה! איך נחזור אליך?",
    placeholder: "השם המלא שלך",
    type: "contact" as const,
  },
];

// --- Validation helpers ---
const MAX_TEXT = 200;
const MAX_TEXTAREA = 1000;
const MAX_PHONE = 20;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

function sanitize(input: string, maxLen: number) {
  return input.replace(/[\u0000-\u001F\u007F<>]/g, "").slice(0, maxLen).trim();
}

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 gradient-hero" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.55_0.24_295/0.12),transparent_70%)]" />
          <div className="container mx-auto px-6 pt-20 pb-28 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium mb-8 text-primary">
              <Brain className="w-4 h-4" />
              סוכנות AI Automation לעסקים קטנים
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-foreground">
              אוטומציה ו-AI <br />
              לעסקים קטנים <br />
              <span className="text-gradient">במחירים חסרי תקדים</span>
              <span className="block text-2xl md:text-3xl font-bold text-muted-foreground mt-4">
                עד 40% פחות מהשוק
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              חוסכים לך עשרות שעות בחודש, מטפלים בלידים 24/7 ומגדילים את העסק עם AI מותאם אישית — במחיר שאף סוכנות לא תוכל לתת לך.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#audit" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
                AI Audit חינם <ArrowLeft className="w-4 h-4" />
              </a>
              <a href="#pricing" className="inline-flex items-center px-7 py-3.5 rounded-xl border border-border bg-card font-semibold hover:bg-secondary transition-smooth">
                לחבילות שלנו
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> ללא התחייבות</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> תוצאות תוך 14 יום</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> מחיר הוגן ושקוף</div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-accent mb-3">מוכר לך?</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">העסק שלך עובד עליך — <br/>במקום בשבילך.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl bg-card border border-border hover:border-destructive/40 hover:shadow-card transition-smooth">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="container mx-auto px-6 py-20 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary mb-3">הפתרון שלנו</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">3 מערכות AI שעובדות בשבילך 24/7</h2>
            <p className="text-muted-foreground text-lg">בנויות לעסקים קטנים — מותקנות תוך שבועיים.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(({ icon: Icon, title, tag, desc, features }) => (
              <div key={title} className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-md">{tag}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
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

        {/* Why cheaper - Trust bar */}
        <section className="py-20 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <PiggyBank className="w-3.5 h-3.5" /> שקיפות מלאה
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">למה אנחנו זולים יותר?</h2>
              <p className="text-muted-foreground text-lg">בלי קסמים. רק טכנולוגיה חכמה ומודל עסקי הוגן.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {whyCheaper.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-7 rounded-2xl bg-background border border-border hover:shadow-card transition-smooth">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 shadow-glow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-6 py-20 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary mb-3">חבילות ומחירים</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">מחירים שקופים. בלי הפתעות.</h2>
            <p className="text-muted-foreground text-lg">תשלום חד-פעמי להקמה + מנוי חודשי. ללא חוזי שנה.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-2xl border transition-smooth flex flex-col ${
                  tier.highlighted
                    ? "bg-card border-primary shadow-elegant md:scale-105"
                    : "bg-card border-border hover:border-primary/40 hover:shadow-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold shadow-glow">
                    <Star className="w-3 h-3" /> הכי פופולרי
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">חבילת {tier.name}</h3>
                  <p className="text-sm text-primary font-semibold leading-relaxed mb-2">{tier.highlight}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-extrabold text-gradient">{tier.setup}</span>
                    <span className="text-sm text-muted-foreground">הקמה חד-פעמית</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{tier.monthly}</span>
                    <span className="text-sm text-muted-foreground">/ חודש</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#audit"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-smooth ${
                    tier.highlighted
                      ? "gradient-primary text-primary-foreground shadow-glow hover:scale-105"
                      : "border border-border bg-background hover:bg-secondary"
                  }`}
                >
                  בקש הצעת מחיר <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* AI Audit - Multi-step form */}
        <section id="audit" className="container mx-auto px-6 py-20 scroll-mt-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <Rocket className="w-3.5 h-3.5" /> חינם לחלוטין
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
                AI Audit חינם <br/>
                <span className="text-gradient">לעסק שלך</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                ענה על 5 שאלות קצרות (פחות מ-2 דקות) — נחזיר לך תוך 24 שעות ניתוח אישי עם 3 הזדמנויות אוטומציה שיחסכו לך הכי הרבה זמן וכסף.
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
            <AuditForm />
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center p-12 md:p-16 rounded-3xl gradient-hero border border-primary/20 shadow-elegant">
            <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">מוכן לתת ל-AI לעבוד בשבילך?</h2>
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
              <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-xl border border-border bg-card font-semibold hover:bg-secondary transition-smooth">
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

// =================== Multi-step AI Audit form ===================
function AuditForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const total = auditQuestions.length;
  const current = auditQuestions[step];
  const progress = Math.round(((step + 1) / total) * 100);

  function handleAnswer(value: string) {
    setError(null);
    const maxLen = current.type === "textarea" ? MAX_TEXTAREA : MAX_TEXT;
    setAnswers((a) => ({ ...a, [current.id]: sanitize(value, maxLen) }));
  }

  function next() {
    setError(null);
    const val = answers[current.id]?.trim() ?? "";
    if (current.type !== "contact" && !val) {
      setError("נא למלא תשובה לפני המעבר לשאלה הבאה");
      return;
    }
    if (current.type === "contact") {
      if (!val) {
        setError("נא להזין את שמך");
        return;
      }
      const cleanPhone = phone.replace(/\s/g, "");
      if (!PHONE_REGEX.test(cleanPhone)) {
        setError("מספר טלפון לא תקין");
        return;
      }
      submitForm();
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  function submitForm() {
    const safeName = sanitize(answers.name ?? "", MAX_TEXT);
    const safePhone = sanitize(phone, MAX_PHONE);
    const lines = [
      "שלום, אשמח ל-AI Audit חינמי 🙏",
      "",
      `שם: ${safeName}`,
      `טלפון: ${safePhone}`,
      `סוג העסק: ${answers.businessType ?? ""}`,
      `לידים בחודש: ${answers.leadsPerMonth ?? ""}`,
      `אתגר: ${answers.biggestChallenge ?? ""}`,
      `כלים נוכחיים: ${answers.currentTools ?? ""}`,
    ].join("\n");

    const phoneNumber = "972525981030";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-card text-center">
        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">קיבלנו! 🎉</h3>
        <p className="text-muted-foreground mb-6">פתחנו לך את וואטסאפ — שלח את ההודעה ונחזור אליך תוך 24 שעות עם הניתוח האישי שלך.</p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setStep(0); setAnswers({}); setPhone(""); }}
          className="text-sm text-primary hover:underline"
        >
          התחל מחדש
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-elegant">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="font-mono">שאלה {step + 1} מתוך {total}</span>
          <span className="font-mono">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div key={current.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <label htmlFor={current.id} className="block text-xl md:text-2xl font-bold mb-5 text-foreground leading-snug">
          {current.label}
        </label>

        {current.type === "text" && (
          <input
            id={current.id}
            type="text"
            autoFocus
            maxLength={MAX_TEXT}
            value={answers[current.id] ?? ""}
            onChange={(e) => handleAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && next()}
            placeholder={current.placeholder}
            className="w-full px-4 py-3.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth text-base"
          />
        )}

        {current.type === "textarea" && (
          <textarea
            id={current.id}
            rows={4}
            autoFocus
            maxLength={MAX_TEXTAREA}
            value={answers[current.id] ?? ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={current.placeholder}
            className="w-full px-4 py-3.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth text-base resize-none"
          />
        )}

        {current.type === "choice" && (
          <div className="grid grid-cols-2 gap-3">
            {current.options?.map((opt) => {
              const selected = answers[current.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(opt)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-smooth ${
                    selected
                      ? "border-primary bg-primary/10 text-primary shadow-glow"
                      : "border-border bg-background hover:border-primary/40 hover:bg-secondary"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {current.type === "contact" && (
          <div className="space-y-3">
            <input
              id={current.id}
              type="text"
              autoFocus
              maxLength={MAX_TEXT}
              value={answers[current.id] ?? ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={current.placeholder}
              className="w-full px-4 py-3.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth text-base"
            />
            <input
              type="tel"
              dir="ltr"
              maxLength={MAX_PHONE}
              value={phone}
              onChange={(e) => { setError(null); setPhone(sanitize(e.target.value, MAX_PHONE)); }}
              placeholder="052-1234567"
              className="w-full px-4 py-3.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth text-base"
            />
          </div>
        )}

        {error && (
          <p className="mt-3 text-sm text-destructive flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> {error}
          </p>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
        >
          <ArrowRight className="w-4 h-4" />
          חזור
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth"
        >
          {step === total - 1 ? (
            <>
              <Send className="w-4 h-4" />
              שלח את ה-Audit
            </>
          ) : (
            <>
              הבא
              <ArrowLeft className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        המידע שלך מאובטח. לא נשלח לך ספאם.
      </p>
    </div>
  );
}
