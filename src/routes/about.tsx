import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Lightbulb, Shield, Users, ArrowLeft, Quote } from "lucide-react";

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
  { icon: Heart, title: "תשוקה לתוצאות", desc: "ההצלחה שלכם היא ההצלחה שלנו. אנחנו לא נחים עד שהמספרים מדברים." },
  { icon: Lightbulb, title: "יצירתיות חכמה", desc: "פתרונות שיווק יצירתיים אבל מבוססי דאטה — לא ניחושים." },
  { icon: Shield, title: "שקיפות מלאה", desc: "דוחות ברורים, מחירים הוגנים וגישה לכל הנתונים שלכם בכל רגע." },
  { icon: Users, title: "ליווי אישי", desc: "מנהל לקוח קבוע שמכיר את העסק שלכם לעומק." },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-20 pb-16 text-center max-w-3xl">
          <div className="text-sm font-semibold text-primary mb-3">הסיפור שלנו</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">סוכנות <span className="text-gradient">חדשה</span>, ניסיון ותיק</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            NetoDigital הוקמה ב-2025 על ידי צוות עם 8+ שנות ניסיון מצטבר בסוכנויות שיווק מובילות בישראל.
            הקמנו את הסוכנות מתוך תסכול — ראינו עסקים קטנים נהדרים שמשלמים הון לסוכנויות גדולות, ומקבלים יחס של "לקוח 47 מתוך 200".
            החלטנו לבנות משהו אחר.
          </p>
        </section>

        <section className="container mx-auto px-6 mb-20 max-w-3xl">
          <div className="p-8 md:p-10 rounded-3xl gradient-card border border-primary/30 relative">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
              "אחרי 8+ שנים בסוכנויות הגדולות בארץ, ראינו את אותה תופעה שוב ושוב — עסקים קטנים שמשלמים תקציבים גדולים, מקבלים נציג אחד מתוך 50 לקוחות, ובסוף נשארים בלי תוצאות. NetoDigital הוקמה בדיוק בשביל לפתור את זה — סוכנות בוטיק עם כמות לקוחות מוגבלת, אסטרטג בכיר על כל חשבון, ויחס של שותף לצמיחה."
            </p>
            <div className="mt-6 text-sm text-muted-foreground">— הצוות המייסד של NetoDigital</div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-6">
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