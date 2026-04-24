import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle, MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { contact } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "צור קשר — NetoDigital" },
      { name: "description", content: "דברו איתנו לקבלת ייעוץ ראשוני חינם והצעת מחיר מותאמת לעסק שלכם." },
      { property: "og:title", content: "צור קשר עם NetoDigital" },
      { property: "og:description", content: "שיחת ייעוץ חינמית של 30 דקות. בואו נבנה לכם אסטרטגיה." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "אתם עסק חדש — למה שאסמוך עליכם?",
    a: "NetoDigital כחברה הוקמה ב-2025, אבל הצוות שמאחוריה מביא איתו 8+ שנות ניסיון מצטבר מסוכנויות שיווק מובילות בישראל ומעבודה עצמאית עם עשרות עסקים. הקמנו את NetoDigital בדיוק כי ראינו פער בשוק — עסקים קטנים נופלים בין הכיסאות של הסוכנויות הגדולות. בנוסף, אנחנו עובדים ללא חוזי התחייבות — אתם נשארים איתנו רק כל עוד אתם מרוצים מהתוצאות.",
  },
  {
    q: "מה התקציב המינימלי כדי לעבוד איתכם?",
    a: "אנחנו מאמינים ששיווק דיגיטלי איכותי צריך להיות נגיש. חבילת ההתחלה שלנו מתחילה ב-2,500 ₪ לחודש ומיועדת לעסקים קטנים בתחילת הדרך. בשיחת ההיכרות החינמית נבין יחד מה מתאים לעסק שלכם — לא נמכור לכם מה שאתם לא צריכים. חשוב לדעת: לתקציב הניהול שלנו תוסיפו את תקציב המדיה (גוגל / מטא) — שמתחיל מ-1,500 ₪ לחודש עבור עסקים מקומיים.",
  },
  {
    q: "מתי אראה תוצאות ראשונות?",
    a: "זה משתנה לפי השירות: פרסום ממומן (Google Ads / Meta) — לידים ראשונים בדרך כלל תוך 7–14 יום מהשקת הקמפיין. רשתות חברתיות אורגניות — בנייה הדרגתית, שיפור מורגש תוך 60–90 יום. קידום אורגני (SEO) — תהליך ארוך טווח, תוצאות משמעותיות תוך 4–6 חודשים. חשוב: כל סוכנות שמבטיחה לכם 'עמוד 1 בגוגל תוך שבוע' — בורחים ממנה. אנחנו עובדים עם יעדים מציאותיים ומדידים.",
  },
  {
    q: "מה ההבדל בינכם לבין סוכנות גדולה?",
    a: "בסוכנות גדולה אתם בדרך כלל לקוח מספר 47 מתוך 200, מנוהלים ע\"י מתמחה, עם דוח אוטומטי שלא קוראים. אצלנו: אסטרטג בכיר מלווה אישית כל לקוח (לא מתמחה ולא נציג שירות). כמות לקוחות מוגבלת במכוון — כדי שנוכל לתת תשומת לב אמיתית. תקשורת ישירה בוואטסאפ — לא מערכת טיקטים. ללא חוזי שנה — אנחנו צריכים להוכיח את עצמנו כל חודש מחדש. אנחנו לא מתאימים לכולם — אם אתם מחפשים מכונה תאגידית, אנחנו לא הכתובת. אם אתם רוצים שותף לצמיחה — בואו נדבר.",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה בשליחה");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בשליחה");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", email: "", business: "", message: "" });
    setSent(false);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-20 pb-12 text-center max-w-3xl">
          <div className="text-sm font-semibold text-primary mb-3">בואו נדבר</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">מתחילים <span className="text-gradient">מהיום</span></h1>
          <p className="text-lg text-muted-foreground">השאירו פרטים ונחזור אליכם תוך 24 שעות עם הצעה ראשונית.</p>
        </section>

        <section className="container mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "אימייל", value: contact.email, href: contact.emailHref, ltr: true },
                { icon: Phone, label: "טלפון", value: contact.phoneDisplay, href: contact.phoneHref, ltr: true },
                { icon: MessageCircle, label: "וואטסאפ", value: "שלחו הודעה", href: contact.whatsappHref, external: true, ltr: false },
                { icon: MapPin, label: "אזור שירות", value: contact.area, ltr: false },
              ].map(({ icon: Icon, label, value, href, external, ltr }) => {
                const inner = (
                  <>
                    <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="font-semibold" {...(ltr ? { dir: "ltr" as const } : {})}>{value}</div>
                    </div>
                  </>
                );
                const className = "p-5 rounded-2xl gradient-card border border-border/50 flex items-center gap-4 hover:border-primary/40 transition-smooth";
                return href ? (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 p-8 rounded-2xl gradient-card border border-border/50 space-y-4"
            >
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-5 flex items-center justify-center shadow-glow animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">
                    תודה{formData.name ? `, ${formData.name}` : ""}! 🎉
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    קיבלנו את הפנייה שלך בהצלחה. הצוות שלנו יחזור אליך תוך 24 שעות לכתובת{" "}
                    <span className="font-semibold text-foreground">{formData.email}</span>
                    {formData.phone && (
                      <> או לטלפון <span className="font-semibold text-foreground">{formData.phone}</span></>
                    )}.
                  </p>

                  <div className="bg-background/50 rounded-xl p-5 text-right max-w-md mx-auto mb-6 border border-border/50">
                    <div className="text-sm font-semibold mb-3 text-primary">סיכום הפנייה שלך:</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">שם:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      {formData.business && (
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">עסק:</span>
                          <span className="font-medium">{formData.business}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">אימייל:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      {formData.phone && (
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">טלפון:</span>
                          <span className="font-medium">{formData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    בינתיים, אתה מוזמן לעקוב אחרינו ברשתות החברתיות 💜
                  </p>
                  <button
                    onClick={handleReset}
                    type="button"
                    className="text-sm text-primary hover:underline font-semibold"
                  >
                    שליחת פנייה נוספת
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">שם מלא</label>
                      <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="ישראל ישראלי" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">טלפון</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="050-1234567" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">אימייל</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">שם העסק</label>
                    <input name="business" value={formData.business} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="העסק שלי" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">איך נוכל לעזור?</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth resize-none" placeholder="ספרו לנו קצת על העסק והאתגרים השיווקיים..." />
                  </div>
                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive text-center">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>שולח... <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>שליחה <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <HelpCircle className="w-4 h-4" />
                שאלות נפוצות
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">לפני שמתחילים, <span className="text-gradient">חשוב שתדעו</span></h2>
              <p className="text-muted-foreground text-lg">התשובות לשאלות שאנחנו שומעים הכי הרבה.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className="group p-6 rounded-2xl gradient-card border border-border/50 hover:border-primary/40 transition-smooth"
                  open={i === 0}
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-lg">
                    <span>{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}