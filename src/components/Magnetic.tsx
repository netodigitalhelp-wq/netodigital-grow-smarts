import { useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic hover wrapper. Element subtly translates toward the cursor.
 * Disabled on touch / coarse pointers via CSS media check at runtime.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  const Component = Tag as any;
  return (
    <Component
      ref={ref as any}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("inline-block will-change-transform transition-transform duration-300 ease-out", className)}
      style={style}
    >
      {children}
    </Component>
  );
}