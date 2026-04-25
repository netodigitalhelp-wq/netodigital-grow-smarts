import { Sparkles } from "lucide-react";

export function UrgencyBanner() {
  return (
    <div className="sticky top-0 z-[60] w-full bg-gradient-to-r from-[oklch(0.45_0.25_280)] via-[oklch(0.5_0.27_290)] to-[oklch(0.55_0.27_300)] text-white text-center text-xs sm:text-sm font-semibold py-2 px-3 shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap leading-tight">
        <Sparkles className="w-4 h-4 text-[oklch(0.9_0.22_175)] flex-shrink-0 animate-pulse" />
        <span>
          מבצע השקה: <span className="text-[oklch(0.9_0.22_175)]">0₪ עלות הקמה</span> ל-10 העסקים הראשונים!
          <span className="hidden sm:inline"> נותרו </span>
          <span className="inline sm:hidden"> · </span>
          <span className="text-[oklch(0.9_0.22_175)]">3 מקומות אחרונים.</span>
        </span>
      </div>
    </div>
  );
}