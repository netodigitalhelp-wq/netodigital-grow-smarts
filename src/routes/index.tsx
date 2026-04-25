import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { AIOrb } from "@/components/AIOrb";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { HeroComposition } from "@/components/HeroComposition";
import { LazyMount } from "@/components/LazyMount";
import { contact } from "@/lib/contact";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Bot,
  MessageSquare,
  Workflow,
  CheckCircle2,
  Brain,
  Zap,
  Send,
  Star,
  Server,
  ShieldCheck,
  Wallet,
  AlertCircle,
  Clock3,
  Rocket,
  Flame,
  Cpu,
  HandCoins,
  FileX2,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NetoDigital — סוכנות AI Automation לעסקים קטנים | 0₪ הקמה" },
      { name: "description", content: "סוכנות AI & Automation לעסקים קטנים. עובדים דיגיטליים שמטפלים במכירות, שירות לקוחות ותוכן 24/7. מבצע השקה: 0₪ עלות הקמה ל-10 העסקים הראשונים." },
      { property: "og:title", content: "NetoDigital — Managed AI Automation לעסקים קטנים" },
      { property: "og:description", content: "בונים לכם 'עובדים דיגיטליים' מבוססי AI. מבצע השקה: 0₪ הקמה ל-10 העסקים הראשונים. ROI מוכח, חיסכון בזמן, צמיחה אוטומטית." },
    ],
  }),
  component: Index,
});

// ============ Data ============

const digitalWorkers = [
  {
    icon: MessageSquare,
    title: "סוכן מכירות אוטונומי",
    tag: "Autonomous WhatsApp Agent",
    desc: "סוכן AI שמנהל שיחות וואטסאפ מקצה לקצה: עונה, מתאם וסוגר עסקה — גם בלילה.",
    features: ["מענה אנושי תוך שניות", "תיאום פגישות אוטומטי", "סינון לידים חמים בלבד"],
  },
  {
    icon: Sparkles,
    title: "מנהל תוכן מבוסס AI",
    tag: "AI Content Manager",
    desc: "מייצר פוסטים, סרטונים וגרפיקה בסגנון המותג שלך — בקצב שאי אפשר להשיג לבד.",
    features: ["פוסטים שבועיים אוטומטיים", "וידאו ותמונות AI", "תזמון חכם לפי הקהל"],
  },
  {
    icon: Workflow,
    title: "אופטימיזציית לידים חכמה",
    tag: "Smart Lead Optimization",
    desc: "מדרג, מנתב ומחמם לידים מפייסבוק וגוגל ישירות ל-CRM — בלי לאבד אף ליד.",
    features: ["סנכרון מודעות → CRM", "דירוג ותעדוף לידים חכם", "פולואפים אוטומטיים"],
  },
];

const managedSteps = [
  { icon: Server, title: "אנחנו מנהלים את התשתית", desc: "שרתים, מודלי AI, אינטגרציות, ניטור — הכל מטופל בצד שלנו. אתה לא צריך לדעת מה זה API." },
  { icon: ShieldCheck, title: "אתה מקבל שקט תעשייתי", desc: "מערכת שעובדת 24/7, מנוטרת, מגובה ומאובטחת. אם משהו נופל — אנחנו יודעים לפניך." },
  { icon: Wallet, title: "מודל מנוי חודשי משתלם", desc: "תשלום קבוע וצפוי. ללא עלויות הקמה (לזמן מוגבל), ללא הפתעות, ללא חוזי שנה." },
];

const benefits = [
  { icon: Eye, title: "שקיפות מלאה", desc: "דשבורד חי, דוחות חודשיים, גישה לכל נתון. בלי ערפל, בלי הפתעות." },
  { icon: FileX2, title: "ללא חוזי שנה", desc: "מנוי חודשי גמיש. לא מתאים? עוצרים בכל רגע, בלי קנסות." },
  { icon: HandCoins, title: "ROI מוכח", desc: "תוצאות מדידות תוך 14 יום. אם לא חוסכים לך זמן — אתה לא משלם." },
];

const tiers = [
  {
    name: "Starter",
    monthly: "149₪",
    setupOriginal: "949₪",
    highlight: "אוטומציה בסיסית של תוכן ושיווק",
    desc: "לעסק שרוצה להתחיל לחסוך זמן על תוכן ונוכחות דיגיטלית.",
    features: [
      "מנהל תוכן AI ל-2 רשתות",
      "תזמון פוסטים אוטומטי",
      "תבניות גרפיות מותאמות מותג",
      "דוח חודשי וביצועים",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    monthly: "249₪",
    setupOriginal: "1,599₪",
    highlight: "נציג AI חכם בוואטסאפ",
    desc: "לעסק שמקבל הרבה פניות ורוצה לסגור יותר עסקאות אוטומטית.",
    features: [
      "כל מה שכלול ב-Starter",
      "בוט AI מותאם בוואטסאפ",
      "מענה אוטומטי 24/7 + תיאום פגישות",
      "סינון לידים חכם והעברה למוקד",
      "אופטימיזציה חודשית של הבוט",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    monthly: "449₪",
    setupOriginal: "3,199₪",
    highlight: "מערכת הפעלה עסקית מלאה",
    desc: "לעסק שרוצה לתפעל את כל תהליך המכירה והשירות באוטומציה.",
    features: [
      "כל מה שכלול ב-Business",
      "אינטגרציה מלאה עם CRM וכלים פנימיים",
      "אוטומציה של פולואפים וסקרי שביעות",
      "דשבורד ביצועים בזמן אמת",
      "אסטרטג AI ייעודי + SLA 4 שעות",
    ],
    highlighted: false,
  },
];

// ============ Audit form definition ============

type Q =
  | { id: string; type: "text"; label: string; placeholder: string }
  | { id: string; type: "choice"; label: string; options: string[] }
  | { id: string; type: "contact"; label: string; placeholder: string };

const auditQuestions: Q[] = [
  { id: "businessType", type: "text", label: "מה תחום העסק שלך?", placeholder: "לדוגמה: קליניקה, חנות אונליין, מאמן אישי, נדל״ן..." },
  {
    id: "boringTask",
    type: "choice",
    label: "מהי הפעולה הכי משעממת ששורפת לך זמן?",
    options: ["מענה לוואטסאפ", "יצירת תוכן", "ניהול לידים", "תיאום פגישות"],
  },
  {
    id: "weeklyHours",
    type: "choice",
    label: "כמה שעות בשבוע אתה משקיע במשימות ידניות?",
    options: ["עד 5 שעות", "5–15 שעות", "15+ שעות"],
  },
  {
    id: "channel",
    type: "choice",
    label: "איפה הלקוחות שלך נמצאים?",
    options: ["וואטסאפ", "אינסטגרם", "גוגל", "פייסבוק"],
  },
  { id: "name", type: "contact", label: "מעולה! איך נחזור אליך?", placeholder: "השם המלא שלך" },
];

// --- Validation helpers ---
const MAX_TEXT = 200;
const MAX_PHONE = 20;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

function sanitize(input: string, maxLen: number) {
  return input.replace(/[\u0000-\u001F\u007F<>]/g, "").slice(0, maxLen).trim();
}

// ============ Component ============

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        {/* Hero — Layered: bg → orb → AI figure (left), RTL copy (right) */}
        <section className="relative overflow-hidden min-h-[92vh] flex items-center" dir="rtl" style={{ backgroundColor: "#000000" }}>
          <HeroComposition />
          <AIOrb className="opacity-40 mix-blend-screen" />

          <div className="container relative mx-auto px-5 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32 max-w-7xl w-full" style={{ zIndex: 30 }}>
            {/* Right-anchored content column (~50% width on md+) — z-30 protected from asset overlap */}
            <div className="relative md:w-1/2 md:ml-auto md:mr-0 text-right" style={{ zIndex: 30 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm font-semibold mb-7 text-accent animate-blur-in">
                <Brain className="w-4 h-4" />
                סוכנות AI Automation מנוהלת לעסקים קטנים
              </div>
              <h1 className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-blur-in text-metallic" style={{ animationDelay: "120ms", letterSpacing: "-0.02em" }}>
                העתיד כבר כאן:
                <span className="block text-gradient mt-1">פתרונות AI מתקדמים</span>
                <span className="block mt-2 text-metallic">לעסק שלך</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-9 leading-relaxed animate-blur-in" style={{ animationDelay: "260ms", letterSpacing: "-0.02em" }}>
                אנחנו בונים לכם <span className="text-foreground font-semibold">"עובדים דיגיטליים"</span> שמטפלים במכירות, שירות ותוכן — 24/7. טכנולוגיה שהופכת לתוצאות.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 animate-blur-in" style={{ animationDelay: "400ms" }}>
                <Magnetic strength={0.3} className="magnetic-cta">
                  <a
                    href="#audit"
                    className="shimmer inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gradient-cta text-accent-foreground font-bold text-base cta-breathe hover:scale-[1.03] transition-smooth"
                  >
                    מתחילים אבחון AI עכשיו <ArrowLeft className="w-4 h-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href="#pricing"
                    className="pulse-glow inline-flex items-center justify-center px-7 py-4 rounded-xl glass-lux font-semibold hover:bg-card/70 transition-smooth"
                  >
                    צפה בחבילות
                  </a>
                </Magnetic>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> 0₪ הקמה</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> ללא חוזי שנה</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> תוצאות תוך 14 יום</div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Workers */}
        <section id="solutions" className="container mx-auto px-5 sm:px-6 py-16 md:py-20 scroll-mt-24">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs sm:text-sm font-bold text-accent mb-3 tracking-wider uppercase">מערך העובדים הדיגיטליים</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-metallic leading-tight">
              העובדים שלא לוקחים יום חופש,<br/>לא דורשים העלאה — ולא ישנים.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">3 מערכות AI שעובדות בשבילך מסביב לשעון.</p>
          </Reveal>
          {/* Mobile: horizontal snap slider · Desktop: grid */}
          <div className="md:hidden -mx-5 px-5 snap-row flex gap-4 overflow-x-auto pb-4" dir="rtl">
            {digitalWorkers.map(({ icon: Icon, title, tag, desc, features }) => (
              <div key={title} className="snap-item flex-shrink-0 w-[85%] p-6 rounded-2xl glass-lux pulse-glow">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-md">{tag}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{desc}</p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Asymmetric Bento — first card spans 2 cols on lg, others are tall */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5 md:gap-6 lg:auto-rows-fr">
            {digitalWorkers.map(({ icon: Icon, title, tag, desc, features }, i) => {
              const bento =
                i === 0
                  ? "lg:col-span-2 lg:row-span-1"
                  : i === 1
                    ? "lg:col-span-1 lg:row-span-2"
                    : "lg:col-span-2 lg:row-span-1";
              return (
                <Reveal key={title} delay={i * 120} className={bento}>
                  <Magnetic strength={0.12} as="div" className="block w-full h-full">
                    <div className="bento-card group h-full p-7 rounded-3xl glass-lux relative overflow-hidden">
                      <div className="bento-card__border" aria-hidden="true" />
                      <div className="relative flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-md">{tag}</span>
                      </div>
                      <h3 className="relative text-xl font-bold mb-2 text-foreground">{title}</h3>
                      <p className="relative text-muted-foreground leading-relaxed mb-5">{desc}</p>
                      <ul className="relative space-y-2">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Iconic Benefits — interactive expand on hover/tap */}
        <section className="container mx-auto px-5 sm:px-6 py-12 md:py-16">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-bold text-metallic mb-3">למה דווקא איתנו?</h2>
            <p className="text-muted-foreground text-sm md:text-base">רחפו עם הסמן או הקליקו לחשיפה.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <details className="group rounded-2xl glass-lux pulse-glow open:shadow-glow open:[&_summary_.chev]:rotate-180">
                  <summary className="cursor-pointer list-none p-6 flex items-center gap-4 select-none">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-open:scale-110">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-base md:text-lg font-bold text-foreground flex-1">{title}</span>
                    <span className="chev text-accent text-xl transition-transform duration-300">＋</span>
                  </summary>
                  <div className="px-6 pb-6 -mt-2 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
                    {desc}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Managed Service Model */}
        <section className="py-16 md:py-20 border-y border-border/40 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,oklch(0.55_0.27_295/0.08),transparent_70%)]" />
          <div className="container mx-auto px-5 sm:px-6">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Managed Service Model
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-metallic">איך זה עובד?</h2>
              <p className="text-muted-foreground text-base md:text-lg">שירות מנוהל מקצה לקצה — בלי שתצטרך להבין שום דבר טכני.</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {managedSteps.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 120} className="relative p-7 rounded-2xl glass-lux pulse-glow hover:border-accent/40 transition-smooth">
                  <div className="absolute top-5 left-5 text-5xl font-extrabold text-accent/10 leading-none select-none">0{i + 1}</div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 relative">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground relative">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative">{desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing — lazy-mounted 200px before viewport */}
        <LazyMount rootMargin="200px" minHeight={900}>
        <section id="pricing" className="container mx-auto px-5 sm:px-6 py-16 md:py-20 scroll-mt-24">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-cta text-accent-foreground text-xs font-extrabold mb-4 shadow-glow-cta">
              <Sparkles className="w-3.5 h-3.5" /> Founders Launch — 0₪ הקמה
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-metallic">חבילות ומחירים</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              מנוי חודשי שקוף, ללא חוזי שנה. כל החבילות כוללות ריטיינר חודשי מוזל לתחזוקה שוטפת.
            </p>
          </Reveal>

          {/* Limited spots counter */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative overflow-hidden rounded-2xl border-2 border-accent/60 bg-gradient-to-l from-accent/15 via-accent/5 to-transparent p-5 md:p-6 shadow-glow-cta">
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative flex items-center gap-4 flex-wrap justify-center sm:justify-between text-center sm:text-right">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-cta flex items-center justify-center shadow-glow-cta flex-shrink-0">
                    <Flame className="w-6 h-6 text-accent-foreground animate-pulse" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-foreground leading-tight">
                      מבצע השקה: <span className="text-gradient-cta">0₪ עלות הקמה</span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      תקף עד שיתפסו כל המקומות
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/80 backdrop-blur border border-accent/40">
                  <span className="text-3xl font-extrabold text-gradient-cta leading-none">3</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                    מקומות<br/>אחרונים
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pricing-spotlight grid md:grid-cols-3 gap-5 md:gap-6 items-stretch max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`pricing-card relative p-7 md:p-8 rounded-2xl glass transition-smooth flex flex-col ${
                  tier.highlighted
                    ? "!border-accent/70 shadow-elegant md:scale-[1.04] ring-1 ring-accent/30"
                    : "hover:!border-primary/40 hover:shadow-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-cta text-accent-foreground text-xs font-extrabold shadow-glow-cta">
                      <Star className="w-3 h-3" /> Founder's Special
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">חבילת {tier.name}</h3>
                  <p className="text-sm text-accent font-semibold leading-relaxed mb-2">{tier.highlight}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
                <div className="mb-6 pb-6 border-b border-border text-right" dir="rtl">
                  <div className="text-xs font-semibold text-muted-foreground mb-1.5">עלות הקמה חד-פעמית</div>
                  <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                    <span className="text-4xl sm:text-5xl font-black text-gradient-cta leading-none drop-shadow-[0_0_18px_oklch(0.9_0.22_175/0.4)]">
                      0₪
                    </span>
                    <span className="text-lg text-muted-foreground/70 line-through decoration-2 decoration-muted-foreground/50">
                      {tier.setupOriginal}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1.5">ריטיינר חודשי</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">{tier.monthly}</span>
                    <span className="text-sm text-muted-foreground">/ חודש</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.25} className={tier.highlighted ? "magnetic-cta" : ""}>
                  <a
                    href="#audit"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-smooth ${
                      tier.highlighted
                        ? "gradient-cta text-accent-foreground shadow-glow-cta hover:scale-105"
                        : "border border-border bg-background hover:border-accent/50 hover:bg-secondary"
                    }`}
                  >
                    קבלו הצעת מחיר <ArrowLeft className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed italic" dir="rtl">
            * עלות ההקמה מסובסדת ל-10 הלקוחות הראשונים בלבד. המחיר החודשי כולל תחזוקה, שרתים ועדכוני AI שוטפים.
          </p>

          {/* Why so affordable? */}
          <div className="mt-14 max-w-3xl mx-auto" dir="rtl">
            <div className="rounded-2xl glass p-7 md:p-9 text-right">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                  <Cpu className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">איך המחירים שלנו כל כך משתלמים?</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    בזכות שימוש בכלי אוטומציה מתקדמים ורזים, אנחנו מצמצמים את עלויות הפיתוח המסורתיות ומעבירים את החיסכון ישירות אליכם. המטרה שלנו: להנגיש את מהפכת ה-AI לכל עסק קטן בישראל, ללא חסמי כניסה.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </LazyMount>

        {/* AI Audit form — lazy-mounted 200px before viewport */}
        <LazyMount rootMargin="200px" minHeight={700}>
        <section id="audit" className="container mx-auto px-5 sm:px-6 py-16 md:py-20 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-cta text-accent-foreground text-xs font-bold mb-4 shadow-glow-cta">
                <Rocket className="w-3.5 h-3.5" /> אבחון AI · חינם
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-metallic">
                בדוק התאמה <br/>
                <span className="text-gradient">לאוטומציה ב-2 דקות</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                ענה על 5 שאלות קצרות. נחזיר אליך תוך 24 שעות עם מפת אוטומציה אישית — בדיוק איפה ה-AI יחסוך לך הכי הרבה זמן וכסף.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "ניתוח אישי ע״י אסטרטג AI בכיר",
                  "3 הזדמנויות אוטומציה מותאמות לעסק שלך",
                  "הערכת חיסכון בזמן ובעלויות",
                  "ללא התחייבות. ללא שיחות מכירה.",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="hidden lg:flex items-center gap-2 mt-8 text-xs text-muted-foreground">
                <Clock3 className="w-4 h-4 text-accent" /> זמן מילוי ממוצע: 1:47 דקות
              </div>
            </Reveal>
            <Reveal delay={150}>
              <AuditForm />
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-5 sm:px-6 py-16 md:py-20">
          <Reveal className="text-center p-10 md:p-16 rounded-3xl glass-lux pulse-glow border border-accent/30 shadow-elegant">
            <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-metallic">מוכנים לתת ל-AI לעבוד בשבילכם?</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
              דברו איתנו בוואטסאפ עכשיו, קבלו מענה תוך דקות — וגישה למבצע ההשקה לפני סגירתו.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Magnetic strength={0.3} className="magnetic-cta">
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-cta text-accent-foreground font-bold shadow-glow-cta cta-breathe hover:scale-105 transition-smooth"
                >
                  <Zap className="w-4 h-4" /> דברו איתנו בוואטסאפ
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link to="/contact" className="pulse-glow inline-flex items-center justify-center px-8 py-4 rounded-xl glass-lux font-semibold hover:bg-card/70 transition-smooth">
                  לכל דרכי התקשורת
                </Link>
              </Magnetic>
            </div>
          </Reveal>
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const total = auditQuestions.length;
  const current = auditQuestions[step];
  const progress = Math.round(((step + 1) / total) * 100);

  function handleAnswer(value: string) {
    setError(null);
    setAnswers((a) => ({ ...a, [current.id]: sanitize(value, MAX_TEXT) }));
  }

  function next() {
    setError(null);
    const val = answers[current.id]?.trim() ?? "";
    if (current.type !== "contact" && !val) {
          setError("נא לבחור או להשלים תשובה לפני שממשיכים.");
      return;
    }
    if (current.type === "contact") {
      if (!val) {
            setError("נא להזין את שמכם המלא.");
        return;
      }
      const cleanPhone = phone.replace(/\s/g, "");
      if (!PHONE_REGEX.test(cleanPhone)) {
            setError("מספר טלפון לא תקין.");
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
    const safeEmail = sanitize(email, MAX_TEXT);
    const lines = [
      "היי נטו-דיגיטל, מילאתי את השאלון באתר ואשמח להתקדם להקמה ללא עלות.",
      "",
      `שם: ${safeName}`,
      `טלפון: ${safePhone}`,
      safeEmail ? `מייל: ${safeEmail}` : "",
      `תחום העסק: ${answers.businessType ?? ""}`,
      `הפעולה הכי משעממת: ${answers.boringTask ?? ""}`,
      `שעות שבועיות במשימות ידניות: ${answers.weeklyHours ?? ""}`,
      `איפה הלקוחות נמצאים: ${answers.channel ?? ""}`,
    ].filter(Boolean).join("\n");

    const phoneNumber = "972525981030";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl glass-strong p-8 md:p-10 shadow-card text-center">
        <div className="w-16 h-16 rounded-full gradient-cta flex items-center justify-center mx-auto mb-4 shadow-glow-cta">
          <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">קיבלנו! 🎉</h3>
        <p className="text-muted-foreground mb-6">פתחנו לך את וואטסאפ — שלח את ההודעה ונחזור אליך תוך 24 שעות עם מפת האוטומציה האישית שלך.</p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setStep(0); setAnswers({}); setPhone(""); setEmail(""); }}
          className="text-sm text-accent hover:underline"
        >
          התחל מחדש
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl glass-lux pulse-glow p-6 md:p-8 shadow-elegant">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="font-mono">שאלה {step + 1} מתוך {total}</span>
          <span className="font-mono">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full gradient-cta shadow-glow-cta transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div key={current.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <label htmlFor={current.id} className="block text-lg md:text-2xl font-bold mb-5 text-foreground leading-snug">
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
            className="w-full px-4 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-smooth text-base"
          />
        )}

        {current.type === "choice" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt) => {
              const selected = answers[current.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(opt)}
                  className={`px-4 py-4 rounded-xl border text-base font-medium transition-smooth ${
                    selected
                      ? "border-accent bg-accent/15 text-foreground shadow-glow-cta"
                      : "border-border bg-background hover:border-accent/40 hover:bg-secondary"
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
              className="w-full px-4 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-smooth text-base"
            />
            <input
              type="tel"
              dir="ltr"
              maxLength={MAX_PHONE}
              value={phone}
              onChange={(e) => { setError(null); setPhone(sanitize(e.target.value, MAX_PHONE)); }}
              placeholder="052-1234567"
              className="w-full px-4 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-smooth text-base"
            />
            <input
              type="email"
              dir="ltr"
              maxLength={MAX_TEXT}
              value={email}
              onChange={(e) => { setError(null); setEmail(sanitize(e.target.value, MAX_TEXT)); }}
              placeholder="האימייל שלך (אופציונלי)"
              className="w-full px-4 py-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-smooth text-base"
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
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
        >
          <ArrowRight className="w-4 h-4" />
          חזור
        </button>
        <button
          type="button"
          onClick={next}
          className="shimmer inline-flex items-center gap-2 px-6 py-3.5 rounded-xl gradient-cta text-accent-foreground font-bold shadow-glow-cta cta-breathe hover:scale-105 transition-smooth"
        >
          {step === total - 1 ? (
            <>
              <Send className="w-4 h-4" />
              שלח את האבחון
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
        🔒 המידע שלך מאובטח. לא נשלח לך ספאם, אף פעם.
      </p>
    </div>
  );
}