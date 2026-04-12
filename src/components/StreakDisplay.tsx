import { motion } from 'motion/react';

interface StreakDisplayProps {
  streak: number;
  bestStreak: number;
  totalCheckIns: number;
  goal: string;
}

export function StreakDisplay({ streak, bestStreak, totalCheckIns, goal }: StreakDisplayProps) {
  return (
    <div className="flex flex-col items-center text-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-8"
      >
        <div className="text-[180px] font-display leading-none text-accent select-none">
          {streak}
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40 whitespace-nowrap">
          Current Streak
        </div>
      </motion.div>

      <div className="w-full max-w-md p-6 border border-border-custom bg-surface/50 backdrop-blur-sm mb-8">
        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Current Goal</div>
        <div className="text-2xl font-display text-white tracking-wide uppercase">
          {goal || "No goal set"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="p-4 border border-border-custom bg-surface/30">
          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Best Streak</div>
          <div className="text-xl font-display text-white">{bestStreak}</div>
        </div>
        <div className="p-4 border border-border-custom bg-surface/30">
          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Total Check-ins</div>
          <div className="text-xl font-display text-white">{totalCheckIns}</div>
        </div>
      </div>
    </div>
  );
}
