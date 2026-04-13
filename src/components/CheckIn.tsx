import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { STREAK_CONTRACT_ADDRESS, STREAK_ABI } from '@/src/lib/contract';
import { getBuilderSuffix } from '@/src/lib/wagmi';
import { Loader2, CheckCircle2, Target } from 'lucide-react';

interface CheckInProps {
  hasGoal: boolean;
  canCheckIn: boolean;
  canHabitCheckIn: boolean;
  onSuccess: () => void;
}

export function CheckIn({ hasGoal, canCheckIn, canHabitCheckIn, onSuccess }: CheckInProps) {
  const [goalInput, setGoalInput] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
      setIsEditingGoal(false);
    }
  }, [isSuccess, onSuccess]);

  const handleSetGoal = () => {
    if (!goalInput) return;
    writeContract({
      address: STREAK_CONTRACT_ADDRESS,
      abi: STREAK_ABI,
      functionName: 'setGoal',
      args: [goalInput],
      // @ts-ignore
      dataSuffix: getBuilderSuffix('STREAK-APP'),
    } as any);
  };

  const handleAppCheckIn = () => {
    writeContract({
      address: STREAK_CONTRACT_ADDRESS,
      abi: STREAK_ABI,
      functionName: 'checkIn',
      // @ts-ignore
      dataSuffix: getBuilderSuffix('STREAK-APP'),
    } as any);
  };

  const handleHabitCheckIn = () => {
    writeContract({
      address: STREAK_CONTRACT_ADDRESS,
      abi: STREAK_ABI,
      functionName: 'habitCheckIn',
      // @ts-ignore
      dataSuffix: getBuilderSuffix('STREAK-APP'),
    } as any);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      {/* Daily App Check-In - The main one */}
      <div className="w-full">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 text-center">App Visit Streak</div>
        {canCheckIn ? (
          <button
            onClick={handleAppCheckIn}
            disabled={isPending || isConfirming}
            className="w-full py-10 bg-accent text-black font-display text-5xl tracking-widest hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex flex-col justify-center items-center shadow-[0_0_30px_rgba(255,95,31,0.3)]"
          >
            {(isPending || isConfirming) ? <Loader2 className="animate-spin" size={40} /> : (
              <>
                <span>DAILY CHECK-IN</span>
                <span className="text-[10px] font-mono tracking-normal mt-1 opacity-60">GAS ONLY • BASE</span>
              </>
            )}
          </button>
        ) : (
          <div className="w-full py-10 border border-border-custom bg-surface/50 text-white/20 font-display text-4xl tracking-widest flex justify-center items-center gap-4 cursor-not-allowed">
            <CheckCircle2 size={40} />
            VISITED TODAY
          </div>
        )}
      </div>

      {/* Habit Section */}
      <div className="w-full p-6 border border-border-custom bg-surface/20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <Target size={12} className="text-accent" />
            Personal Habit
          </div>
          {hasGoal && !isEditingGoal && (
            <button 
              onClick={() => setIsEditingGoal(true)}
              className="text-[10px] uppercase tracking-widest text-accent hover:underline"
            >
              Edit Goal
            </button>
          )}
        </div>

        {!hasGoal || isEditingGoal ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="E.G. 100 PUSHUPS"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value.toUpperCase())}
                className="flex-1 bg-black border border-border-custom p-3 font-mono text-xs focus:border-accent outline-none transition-colors uppercase"
              />
              <button
                onClick={handleSetGoal}
                disabled={isPending || isConfirming || !goalInput}
                className="px-6 bg-white text-black font-display text-lg tracking-wider hover:bg-white/90 disabled:opacity-50 transition-all"
              >
                SAVE
              </button>
            </div>
            {hasGoal && (
              <button 
                onClick={() => setIsEditingGoal(false)}
                className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/40 self-start"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {canHabitCheckIn ? (
              <button
                onClick={handleHabitCheckIn}
                disabled={isPending || isConfirming}
                className="w-full py-4 border-2 border-accent text-accent font-display text-2xl tracking-widest hover:bg-accent hover:text-black transition-all flex justify-center items-center gap-2"
              >
                {(isPending || isConfirming) ? <Loader2 className="animate-spin" /> : 'COMPLETE HABIT'}
              </button>
            ) : (
              <div className="w-full py-4 border border-border-custom bg-white/5 text-white/40 font-display text-2xl tracking-widest flex justify-center items-center gap-2 cursor-not-allowed">
                <CheckCircle2 size={20} />
                HABIT DONE
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
