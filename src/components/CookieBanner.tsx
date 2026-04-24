import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "neto_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-5 md:max-w-sm z-40 p-5 rounded-2xl gradient-card border border-border shadow-elegant backdrop-blur-xl">
      <p className="text-sm text-foreground mb-3 leading-relaxed">
        🍪 האתר משתמש בעוגיות לשיפור החוויה ולאנליטיקה.
        {" "}
        <Link to="/privacy" className="text-primary hover:underline">קרא עוד</Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:scale-[1.02] transition-smooth"
        >
          אישור
        </button>
        <button
          onClick={decline}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary/50 transition-smooth"
        >
          דחייה
        </button>
      </div>
    </div>
  );
}