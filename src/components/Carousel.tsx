"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import type { Project } from "@/data/portfolio";

/* -------------------------------------------------------------------------- */
/* Responsive helper hook                                                      */
/* -------------------------------------------------------------------------- */
function useCardDimensions() {
  const [dims, setDims] = useState({ cardW: 560, cardH: 370, gap: 50 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        // Mobile screens: card takes up ~84% of viewport width
        const w = Math.min(340, Math.floor(vw * 0.84));
        const h = Math.floor(w * 0.76);
        setDims({ cardW: w, cardH: h, gap: 20 });
      } else if (vw < 1024) {
        // Tablet screens
        const w = Math.min(460, Math.floor(vw * 0.7));
        const h = Math.floor(w * 0.68);
        setDims({ cardW: w, cardH: h, gap: 35 });
      } else {
        // Desktop
        setDims({ cardW: 560, cardH: 370, gap: 50 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

/* -------------------------------------------------------------------------- */
/* CarouselCard                                                                */
/* -------------------------------------------------------------------------- */
function CarouselCard({
  project,
  index,
  mx,
  padLeft,
  cardW,
  cardH,
  gap,
  onClick,
}: {
  project: Project;
  index: number;
  mx: ReturnType<typeof useMotionValue<number>>;
  padLeft: number;
  cardW: number;
  cardH: number;
  gap: number;
  onClick: () => void;
}) {
  const [style, setStyle] = useState({ ry: 0, tz: 0, s: 1 });
  const cardStep = cardW + gap;

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const centre = vw / 2;
      const cardLeft = padLeft + index * cardStep + mx.get();
      const cardCentre = cardLeft + cardW / 2;
      const dist = (cardCentre - centre) / cardStep;

      const isMobile = vw < 640;
      setStyle({
        ry: dist * (isMobile ? -14 : -22),
        tz: -Math.abs(dist) * (isMobile ? 35 : 60),
        s: Math.max(isMobile ? 0.88 : 0.85, 1 - Math.abs(dist) * (isMobile ? 0.05 : 0.06)),
      });
    };

    const unsub = mx.on("change", calc);
    calc();
    window.addEventListener("resize", calc);
    return () => {
      unsub();
      window.removeEventListener("resize", calc);
    };
  }, [mx, index, padLeft, cardW, cardStep]);

  return (
    <div
      className="flex-shrink-0 cursor-pointer group select-none touch-pan-y"
      style={{
        width: cardW,
        marginRight: gap,
        transform: `perspective(1200px) rotateY(${style.ry}deg) translateZ(${style.tz}px) scale(${style.s})`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onClick={onClick}
    >
      {/* ---- Card surface ---- */}
      <div
        className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[18px]"
        style={{
          height: cardH,
          background: project.gradient,
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Subtle radial highlight */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 35%, ${project.accentColor} 0%, transparent 60%)`,
          }}
        />

        {/* Decorative grid overlay to mimic a website screenshot */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-7">
          <div className="flex items-start justify-between">
            <span
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-medium opacity-60"
              style={{ color: project.textColor }}
            >
              {project.tags[0]}
            </span>
            {project.award && <span className="text-sm sm:text-base opacity-80">🏆</span>}
          </div>

          <div>
            <h3
              className="text-[20px] sm:text-[28px] font-bold leading-[1.15] tracking-tight mb-2 sm:mb-3"
              style={{ color: project.textColor }}
            >
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {project.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] px-2 sm:px-2.5 py-[2px] sm:py-[3px] rounded-full border font-medium"
                  style={{
                    color: `${project.textColor}cc`,
                    borderColor: `${project.textColor}22`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow button */}
        <button
          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label={`Open ${project.title}`}
          tabIndex={-1}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Label below card */}
      <p className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] font-light text-white/45 tracking-wide pl-1">
        {project.title}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Carousel                                                                    */
/* -------------------------------------------------------------------------- */
export function Carousel({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const { cardW, cardH, gap } = useCardDimensions();
  const cardStep = cardW + gap;

  const x = useMotionValue(0);
  const targetX = useRef(0);
  const dragging = useRef(false);
  const [pad, setPad] = useState(0);

  /* Centre the first card on mount & resize */
  useEffect(() => {
    const update = () => setPad((window.innerWidth - cardW) / 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cardW]);

  /* Snap to the nearest card after drag ends */
  const snap = useCallback(
    (vel: number) => {
      const cur = x.get();
      let idx =
        Math.abs(vel) > 200
          ? vel > 0
            ? Math.floor(-cur / cardStep)
            : Math.ceil(-cur / cardStep)
          : Math.round(-cur / cardStep);
      idx = Math.max(0, Math.min(projects.length - 1, idx));
      targetX.current = -idx * cardStep;
      animate(x, targetX.current, {
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 0.6,
      });
    },
    [x, projects.length, cardStep],
  );

  /* Keyboard navigation */
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      const cur = x.get();
      const idx = Math.round(-cur / cardStep);
      if (e.key === "ArrowRight" && idx < projects.length - 1) {
        targetX.current = -(idx + 1) * cardStep;
        animate(x, targetX.current, {
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.6,
        });
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        targetX.current = -(idx - 1) * cardStep;
        animate(x, targetX.current, {
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.6,
        });
      }
    },
    [x, projects.length, cardStep],
  );

  /* Wheel navigation */
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;

      if (Math.abs(targetX.current - x.get()) > 10) {
        targetX.current = x.get();
      }

      // Fast, responsive delta multiplier so small swipes move across cards effortlessly
      targetX.current -= delta * 7.5;
      
      const minX = -(projects.length - 1) * cardStep;
      const maxX = 0;
      targetX.current = Math.max(minX, Math.min(maxX, targetX.current));
      
      animate(x, targetX.current, {
        type: "spring",
        stiffness: 320,
        damping: 28,
        mass: 0.5,
      });
      
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        const idx = Math.round(-targetX.current / cardStep);
        targetX.current = -idx * cardStep;
        animate(x, targetX.current, {
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.6,
        });
      }, 70);
    },
    [x, projects.length, cardStep]
  );

  return (
    <div
      className="absolute inset-0 flex items-center overflow-hidden touch-none select-none"
      tabIndex={0}
      onKeyDown={handleKey}
      onWheel={handleWheel}
      role="listbox"
      aria-label="Project carousel"
    >
      <motion.div
        className="flex items-center"
        style={{ x, paddingLeft: pad }}
        drag="x"
        dragConstraints={{
          left: -(projects.length - 1) * cardStep,
          right: 0,
        }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => {
          dragging.current = true;
        }}
        onDragEnd={(_, info) => {
          snap(info.velocity.x);
          setTimeout(() => {
            dragging.current = false;
          }, 200);
        }}
      >
        {projects.map((p, i) => (
          <CarouselCard
            key={p.id}
            project={p}
            index={i}
            mx={x}
            padLeft={pad}
            cardW={cardW}
            cardH={cardH}
            gap={gap}
            onClick={() => {
              if (!dragging.current) onSelect(p);
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
