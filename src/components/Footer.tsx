"use client";

/**
 * Footer — view toggle (left) + newsletter link (right).
 * Fixed at the bottom, transparent, always visible.
 */
interface FooterProps {
  view: "featured" | "full";
  onViewChange: (view: "featured" | "full") => void;
}

export function Footer({ view, onViewChange }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6 pointer-events-none">
      {/* View toggle */}
      <div className="flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.15em] pointer-events-auto">
        <button
          onClick={() => onViewChange("featured")}
          className={`transition-opacity duration-200 ${
            view === "featured"
              ? "text-white font-medium"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          Featured
        </button>
        <span className="text-white/25">/</span>
        <button
          onClick={() => onViewChange("full")}
          className={`transition-opacity duration-200 ${
            view === "full"
              ? "text-white font-medium"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          Full
        </button>
      </div>

      {/* Newsletter */}
      <button className="text-[11px] md:text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white/70 transition-opacity duration-200 pointer-events-auto">
        Newsletter
      </button>
    </footer>
  );
}
