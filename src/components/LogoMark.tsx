import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

/**
 * Official NetoDigital logo with recurring shine streak across the crystal text.
 * The logo image already includes the orb above the "i".
 */
export function LogoMark({ className, alt = "NetoDigital" }: { className?: string; alt?: string }) {
  return (
    <span className={cn("logo-shine relative inline-flex items-center", className)}>
      <img
        src={logo}
        alt={alt}
        className="block w-auto h-full object-contain select-none"
        draggable={false}
      />
    </span>
  );
}