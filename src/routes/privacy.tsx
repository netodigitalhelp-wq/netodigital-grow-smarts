import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact } from "@/lib/contact";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "מדיניות פרטיות — NetoDigital" },
      { name: "description", content: "מדיניות הפרטיות של NetoDigital — איך אנחנו אוספים, שומרים ומשתמשים במידע שלכם." },
      { property: "og:title", content: "מדיניות פרטיות — NetoDigital" },
      { property: "og:description", content: "מדיניות הפרטיות של NetoDigital." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-20 pb-24 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">מדיניות פרטיות</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>תאריך עדכון אחרון: {new Date().toLocaleDateString("he-IL")}</p>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">1. כללי</h2>
              <p>NetoDigital ("אנחנו") מכבדת את פרטיותכם. מסמך זה מסביר איזה מידע אנו אוספים באתר ואיך אנו משתמשים בו.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">2. איסוף מידע</h2>
              <p>אנחנו אוספים מידע שאתם מוסרים בטופס יצירת קשר: שם, טלפון, אימייל, שם העסק ותוכן הפנייה. בנוסף, אנו משתמשים בעוגיות (Cookies) טכניות לצורך תפעול האתר ואנליטיקה אנונימית.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">3. שימוש במידע</h2>
              <p>המידע משמש אותנו אך ורק לחזרה אליכם, מתן הצעת מחיר וליווי שיווקי. איננו מעבירים את פרטיכם לצד שלישי ללא הסכמתכם.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">4. אבטחת מידע</h2>
              <p>אנו נוקטים באמצעי אבטחה מקובלים לשמירת המידע (תקשורת מוצפנת, אחסון מאובטח ב-Cloud).</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">5. זכויותיכם</h2>
              <p>אתם רשאים לבקש בכל עת לעיין במידע שנאסף עליכם, לתקן אותו או למחוק אותו, באמצעות פנייה אלינו.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">6. יצירת קשר</h2>
              <p>
                לכל שאלה בנושא פרטיות:{" "}
                <a href={contact.emailHref} className="text-primary hover:underline">{contact.email}</a>
                {" "}|{" "}
                <a href={contact.phoneHref} className="text-primary hover:underline" dir="ltr">{contact.phoneDisplay}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}