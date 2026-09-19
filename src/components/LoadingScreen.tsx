"use client";

import { motion } from "framer-motion";

/**
 * LoadingScreen — 3 pulsing horizontal bars on a black background.
 * Auto-fades after 2.5 s and fires onComplete to unmount.
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex items-center gap-3">
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
      </div>
    </motion.div>
  );
}
