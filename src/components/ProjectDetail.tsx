"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import type { Project } from "@/data/portfolio";

/**
 * ProjectDetail — full-screen slide-in panel (from right).
 * Left column: project info, tags, links.
 * Right column: scrollable gradient "screenshot" cards.
 * Press Escape or click backdrop to close.
 */
export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  /* Escape to close */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, handleKey]);

  /* Screenshot labels for the gradient placeholders */
  const views = ["Desktop View", "Tablet View", "Detail View"];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ---- Backdrop ---- */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ---- Panel ---- */}
          <motion.div
            className="relative ml-auto w-full max-w-[1200px] h-full bg-[#0a0a0a] border-l border-white/[0.06] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* ---- Left info column ---- */}
            <div className="w-full md:w-[380px] flex-shrink-0 p-6 sm:p-8 md:p-10 pt-14 sm:pt-16 flex flex-col">
              {/* Category badge */}
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2 sm:mb-3">
                {project.category === "video"
                  ? "Video Editing"
                  : "Software Engineering"}
              </span>

              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4">
                {project.title}
              </h2>

              <p className="text-[15px] text-white/45 font-light leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Meta pills */}
              <div className="flex items-center gap-3 flex-wrap mb-6">
                {/* Arrow circle */}
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>

                {project.client && (
                  <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/60 bg-white/10 px-3 py-1.5 rounded-full">
                    {project.client}
                  </span>
                )}
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/60 bg-white/10 px-3 py-1.5 rounded-full">
                  {project.year}
                </span>
                {project.award && <span className="text-lg">🏆</span>}
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mb-auto">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-[0.1em] px-3 py-1 rounded-full border border-white/10 text-white/40 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-5 mt-8 pt-6 border-t border-white/[0.06]">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors"
                  >
                    Visit Site →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {project.youtubeId && (
                  <a
                    href={`https://youtube.com/watch?v=${project.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors"
                  >
                    Watch →
                  </a>
                )}
              </div>
            </div>

            {/* ---- Right screenshot area ---- */}
            <div className="flex-1 overflow-y-auto detail-scroll p-6 md:p-10 pt-10 md:pt-16 space-y-6">
              {views.map((label, i) => (
                <div
                  key={i}
                  className="w-full aspect-[16/10] rounded-2xl overflow-hidden"
                  style={{
                    background: project.gradient,
                    boxShadow: "0 6px 30px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] mb-3 opacity-35"
                      style={{ color: project.textColor }}
                    >
                      {label}
                    </span>
                    <h4
                      className="text-xl font-bold opacity-50"
                      style={{ color: project.textColor }}
                    >
                      {project.title}
                    </h4>
                    <div className="mt-4 flex gap-2 flex-wrap justify-center">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border opacity-25"
                          style={{
                            color: project.textColor,
                            borderColor: `${project.textColor}30`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-8 md:left-10 hidden md:block">
              <div className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-white/35"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
