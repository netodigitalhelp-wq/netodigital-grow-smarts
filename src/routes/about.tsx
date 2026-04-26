import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Settings, Users, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "אודות — NetoDigital" },
      { name: "description", content: "הסיפור שלנו, הצוות שלנו והערכים שמובילים אותנו בעבודה עם עסקים קטנים." },
      { property: "og:title", content: "אודות NetoDigital" },
      { property: "og:description", content: "אנחנו סוכנות שיווק דיגיטלי שמתמחה בעסקים קטנים ובינוניים." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Shield,
    title: "אמינות מעל הכל",
    desc: "אנחנו לא מבטיחים דברים שלא נוכל לעמוד בהם. אם לא חוסכים לך זמן תוך 14 יום — אתה לא משלם. פשוט כך.",
  },
  {
    icon: Settings,
    title: "מומחיות בתוצאות",
    desc: "אנחנו מתמחים באחד הדבר: לגרום לעסקים קטנים לעבוד חכם יותר עם AI. לא שיווק כללי, לא ייעוץ — אוטומציה שעובדת.",
  },
  {
    icon: Users,
    title: "שירות אישי אמיתי",
    desc: "אצלנו אתה לא \"לקוח מספר 50\". יש לך איש קשר ישיר שמכיר את העסק שלך לעומק ועונה תוך שעה.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-20 pb-16 text-center max-w-3xl">
          <div className="inline-block text-sm font-semibold text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            אודות NetoDigital
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            אנחנו לא סוכנות. <br />
            <span className="text-gradient">אנחנו שותפים לצמיחה.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            NetoDigital הוקמה מתוך תסכול אמיתי — ראינו עסקים קטנים מצוינים שמפסידים לידים, מבזבזים זמן על משימות חוזרות, ולא מצליחים לגדול. החלטנו לבנות את הפתרון שהיינו רוצים שיהיה קיים.
          </p>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl gradient-card border border-border/50">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 mb-24">
          <div className="p-12 rounded-3xl gradient-hero border border-primary/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">בואו נכיר</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">השיחה הראשונה תמיד על חשבוננו.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth">
              צרו קשר <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}