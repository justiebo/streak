/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { STREAK_CONTRACT_ADDRESS, STREAK_ABI } from '@/src/lib/contract';
import { Providers } from '@/src/components/Providers';
import { WalletButton } from '@/src/components/WalletButton';
import { StreakDisplay } from '@/src/components/StreakDisplay';
import { CheckIn } from '@/src/components/CheckIn';
import { PublicProfile } from '@/src/components/PublicProfile';
import { Flame } from 'lucide-react';

function StreakApp() {
  const { address, isConnected } = useAccount();

  const { data: streakData, refetch } = useReadContract({
    address: STREAK_CONTRACT_ADDRESS,
    abi: STREAK_ABI,
    functionName: 'getStreak',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // Calculate if can check in based on timestamps from streakData
  const canAppCheckIn = useMemo(() => {
    if (!streakData) return false;
    const lastVisit = Number(streakData[3]);
    if (lastVisit === 0) return true;
    const currentDay = Math.floor(Date.now() / 1000 / 86400);
    const lastDay = Math.floor(lastVisit / 86400);
    return currentDay > lastDay;
  }, [streakData]);

  const canHabitCheckIn = useMemo(() => {
    if (!streakData) return false;
    const lastHabit = Number(streakData[4]);
    if (lastHabit === 0) return true;
    const currentDay = Math.floor(Date.now() / 1000 / 86400);
    const lastDay = Math.floor(lastHabit / 86400);
    return currentDay > lastDay;
  }, [streakData]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pb-20">
      <header className="w-full max-w-5xl flex justify-between items-center py-8">
        <div className="flex items-center gap-2">
          <Flame className="text-accent" size={32} fill="currentColor" />
          <h1 className="text-4xl font-display tracking-tighter">STREAK</h1>
        </div>
        <WalletButton />
      </header>

      <main className="w-full max-w-5xl flex flex-col items-center">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h2 className="text-6xl font-display mb-4 tracking-tight">COMMIT ONCHAIN.</h2>
            <p className="text-white/40 max-w-md mb-12 uppercase tracking-[0.2em] text-xs leading-relaxed">
              Daily app check-ins + Personal habits. <br />
              Build your legacy on Base.
            </p>
            <WalletButton />
          </div>
        ) : (
          <>
            {streakData && (
              <StreakDisplay
                streak={Number(streakData[0])}
                bestStreak={Number(streakData[1])}
                totalCheckIns={0} // Not used in new contract
                goal={streakData[2]}
              />
            )}
            
            <div className="mt-12 w-full flex justify-center">
              <CheckIn 
                hasGoal={!!streakData?.[5]} 
                canCheckIn={canAppCheckIn}
                canHabitCheckIn={canHabitCheckIn}
                onSuccess={() => refetch()} 
              />
            </div>
          </>
        )}

        <PublicProfile />
      </main>

      <footer className="mt-auto pt-20 text-[10px] uppercase tracking-[0.4em] text-white/10">
        Built for Base App • 2026
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <StreakApp />
    </Providers>
  );
}
