"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/portfolio";

/**
 * FullView — text-only list of project names separated by dots.
 * Hovering a name shows a floating gradient preview card near the cursor.
 * Clicking opens the project detail.
 */
export function FullView({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-10 md:px-24"
      onMouseMove={handleMouseMove}
    >
      <div className="text-center max-w-5xl leading-[2.2] md:leading-[2.4]">
        {projects.map((p, i) => (
          <span key={p.id} className="inline">
            {i > 0 && (
              <span className="text-white/15 mx-2 md:mx-3 text-lg select-none">
                ·
              </span>
            )}
            <motion.button
              className="text-base md:text-xl lg:text-[26px] font-light text-white/50 hover:text-white transition-colors duration-200 whitespace-nowrap"
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(p)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.15 }}
            >
              {p.title}
            </motion.button>
          </span>
        ))}
      </div>

      {/* ---- Hover preview card ---- */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="fixed z-40 pointer-events-none rounded-xl overflow-hidden"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 100,
              width: 260,
              height: 170,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="w-full h-full flex flex-col justify-end p-5"
              style={{ background: hovered.gradient }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.15em] opacity-45 mb-1"
                style={{ color: hovered.textColor }}
              >
                {hovered.year}
              </span>
              <span
                className="text-sm font-semibold leading-tight"
                style={{ color: hovered.textColor }}
              >
                {hovered.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
