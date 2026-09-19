"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import type { Project } from "@/data/portfolio";

/* -------------------------------------------------------------------------- */
/* Constants                                                                   */
/* -------------------------------------------------------------------------- */
const CARD_W = 560;
const CARD_H = 370;
const GAP = 50;
const CARD_STEP = CARD_W + GAP;

/* -------------------------------------------------------------------------- */
/* CarouselCard                                                                */
/* -------------------------------------------------------------------------- */
function CarouselCard({
  project,
  index,
  mx,
  padLeft,
  onClick,
}: {
  project: Project;
  index: number;
  mx: ReturnType<typeof useMotionValue<number>>;
  padLeft: number;
  onClick: () => void;
}) {
  const [style, setStyle] = useState({ ry: 0, tz: 0, s: 1 });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const centre = vw / 2;
      const cardLeft = padLeft + index * CARD_STEP + mx.get();
      const cardCentre = cardLeft + CARD_W / 2;
      const dist = (cardCentre - centre) / CARD_STEP;

      setStyle({
        ry: dist * -22,
        tz: -Math.abs(dist) * 60,
        s: Math.max(0.85, 1 - Math.abs(dist) * 0.06),
      });
    };

    const unsub = mx.on("change", calc);
    calc();
    window.addEventListener("resize", calc);
    return () => {
      unsub();
      window.removeEventListener("resize", calc);
    };
  }, [mx, index, padLeft]);

  return (
    <div
      className="flex-shrink-0 cursor-pointer group select-none"
      style={{
        width: CARD_W,
        marginRight: GAP,
        transform: `perspective(1200px) rotateY(${style.ry}deg) translateZ(${style.tz}px) scale(${style.s})`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onClick={onClick}
    >
      {/* ---- Card surface ---- */}
      <div
        className="relative w-full overflow-hidden rounded-[18px]"
        style={{
          height: CARD_H,
          background: project.gradient,
          boxShadow: "0 10px 50px rgba(0,0,0,0.6)",
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
        <div className="absolute inset-0 flex flex-col justify-between p-7">
          <div className="flex items-start justify-between">
            <span
              className="text-[10px] uppercase tracking-[0.18em] font-medium opacity-50"
              style={{ color: project.textColor }}
            >
              {project.tags[0]}
            </span>
            {project.award && <span className="text-base opacity-80">🏆</span>}
          </div>

          <div>
            <h3
              className="text-[28px] font-bold leading-[1.15] tracking-tight mb-3"
              style={{ color: project.textColor }}
            >
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[9px] uppercase tracking-[0.12em] px-2.5 py-[3px] rounded-full border font-medium"
                  style={{
                    color: `${project.textColor}aa`,
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
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label={`Open ${project.title}`}
          tabIndex={-1}
        >
          <svg
            width="12"
            height="12"
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
      <p className="mt-4 text-[13px] font-light text-white/45 tracking-wide pl-1">
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
  const x = useMotionValue(0);
  const targetX = useRef(0);
  const dragging = useRef(false);
  const [pad, setPad] = useState(0);

  /* Centre the first card on mount & resize */
  useEffect(() => {
    const update = () => setPad((window.innerWidth - CARD_W) / 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Snap to the nearest card after drag ends */
  const snap = useCallback(
    (vel: number) => {
      const cur = x.get();
      let idx =
        Math.abs(vel) > 400
          ? vel > 0
            ? Math.floor(-cur / CARD_STEP)
            : Math.ceil(-cur / CARD_STEP)
          : Math.round(-cur / CARD_STEP);
      idx = Math.max(0, Math.min(projects.length - 1, idx));
      targetX.current = -idx * CARD_STEP;
      animate(x, targetX.current, {
        type: "spring",
        stiffness: 80,
        damping: 22,
      });
    },
    [x, projects.length],
  );

  /* Keyboard navigation */
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      const cur = x.get();
      const idx = Math.round(-cur / CARD_STEP);
      if (e.key === "ArrowRight" && idx < projects.length - 1) {
        targetX.current = -(idx + 1) * CARD_STEP;
        animate(x, targetX.current, {
          type: "spring",
          stiffness: 80,
          damping: 22,
        });
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        targetX.current = -(idx - 1) * CARD_STEP;
        animate(x, targetX.current, {
          type: "spring",
          stiffness: 80,
          damping: 22,
        });
      }
    },
    [x, projects.length],
  );

  /* Wheel navigation */
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // Keep targetX in sync if dragging changed x
      if (Math.abs(targetX.current - x.get()) > 1) {
        targetX.current = x.get();
      }
      targetX.current -= delta * 1.5;
      
      const minX = -(projects.length - 1) * CARD_STEP;
      const maxX = 0;
      targetX.current = Math.max(minX, Math.min(maxX, targetX.current));
      
      animate(x, targetX.current, {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      });
      
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        const idx = Math.round(-targetX.current / CARD_STEP);
        targetX.current = -idx * CARD_STEP;
        animate(x, targetX.current, {
          type: "spring",
          stiffness: 80,
          damping: 22,
        });
      }, 150);
    },
    [x, projects.length]
  );

  return (
    <div
      className="absolute inset-0 flex items-center overflow-hidden"
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
          left: -(projects.length - 1) * CARD_STEP,
          right: 0,
        }}
        dragElastic={0.06}
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
            onClick={() => {
              if (!dragging.current) onSelect(p);
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
