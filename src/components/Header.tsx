"use client";

import { personalInfo } from "@/data/portfolio";

/**
 * Header — name (top-left) + Profile link (top-right).
 * Fixed, transparent, always visible above carousel and modals.
 */
export function Header({ onProfileClick }: { onProfileClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 py-4 sm:py-6 pointer-events-none">
      <span className="text-[10px] sm:text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-white pointer-events-auto">
        {personalInfo.name}
      </span>
      <button
        onClick={onProfileClick}
        className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity pointer-events-auto"
      >
        Profile
      </button>
    </header>
  );
}
