import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

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

function ContactPage() {
  const [sent, setSent] = useState(false);

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
                { icon: Mail, label: "אימייל", value: "hello@netodigital.co.il" },
                { icon: Phone, label: "טלפון", value: "03-555-1234" },
                { icon: MapPin, label: "כתובת", value: "רוטשילד 22, תל אביב" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-5 rounded-2xl gradient-card border border-border/50 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="font-semibold">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="lg:col-span-2 p-8 rounded-2xl gradient-card border border-border/50 space-y-4"
            >
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow">
                    <Send className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">תודה!</h3>
                  <p className="text-muted-foreground">קיבלנו את הפנייה ונחזור אליך בהקדם.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">שם מלא</label>
                      <input required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="ישראל ישראלי" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">טלפון</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="050-1234567" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">אימייל</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">שם העסק</label>
                    <input className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth" placeholder="העסק שלי" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">איך נוכל לעזור?</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth resize-none" placeholder="ספרו לנו קצת על העסק והאתגרים השיווקיים..." />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-smooth">
                    שליחה <Send className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}