import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { STREAK_CONTRACT_ADDRESS, STREAK_ABI } from '@/src/lib/contract';
import { getBuilderSuffix } from '@/src/lib/wagmi';
import { Loader2, CheckCircle2, Target } from 'lucide-react';

interface CheckInProps {
  hasGoal: boolean;
  canCheckIn: boolean;
  onSuccess: () => void;
}

export function CheckIn({ hasGoal, canCheckIn, onSuccess }: CheckInProps) {
  const [goalInput, setGoalInput] = useState('');
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const handleSetGoal = () => {
    if (!goalInput) return;
    writeContract({
      address: STREAK_CONTRACT_ADDRESS,
      abi: STREAK_ABI,
      functionName: 'setGoal',
      args: [goalInput],
      // @ts-ignore - dataSuffix is supported by viem but might not be in wagmi's strict hook types
      dataSuffix: getBuilderSuffix('STREAK-APP'),
    } as any);
  };

  const handleCheckIn = () => {
    writeContract({
      address: STREAK_CONTRACT_ADDRESS,
      abi: STREAK_ABI,
      functionName: 'checkIn',
      // @ts-ignore - dataSuffix is supported by viem but might not be in wagmi's strict hook types
      dataSuffix: getBuilderSuffix('STREAK-APP'),
    } as any);
  };

  if (!hasGoal) {
    return (
      <div className="w-full max-w-md p-8 border border-accent/20 bg-accent/5">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-accent" size={24} />
          <h2 className="text-2xl font-display tracking-wide uppercase">Define Your Streak</h2>
        </div>
        <input
          type="text"
          placeholder="E.G. 100 PUSHUPS DAILY"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value.toUpperCase())}
          className="w-full bg-black border border-border-custom p-4 mb-4 font-mono text-sm focus:border-accent outline-none transition-colors uppercase"
        />
        <button
          onClick={handleSetGoal}
          disabled={isPending || isConfirming || !goalInput}
          className="w-full py-4 bg-accent text-black font-display text-2xl tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
        >
          {(isPending || isConfirming) ? <Loader2 className="animate-spin" /> : 'SET GOAL'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {canCheckIn ? (
        <button
          onClick={handleCheckIn}
          disabled={isPending || isConfirming}
          className="w-full py-8 bg-accent text-black font-display text-4xl tracking-widest hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex justify-center items-center gap-3"
        >
          {(isPending || isConfirming) ? <Loader2 className="animate-spin" size={32} /> : 'CHECK IN'}
        </button>
      ) : (
        <div className="w-full py-8 border border-border-custom bg-surface/50 text-white/40 font-display text-3xl tracking-widest flex justify-center items-center gap-3 cursor-not-allowed">
          <CheckCircle2 size={32} />
          CHECKED IN
        </div>
      )}
      {!canCheckIn && (
        <p className="text-center mt-4 text-[10px] uppercase tracking-widest text-white/20">
          Come back tomorrow to keep the streak alive
        </p>
      )}
    </div>
  );
}
