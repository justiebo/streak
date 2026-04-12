/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

  const { data: canCheckIn } = useReadContract({
    address: STREAK_CONTRACT_ADDRESS,
    abi: STREAK_ABI,
    functionName: 'canCheckIn',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

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
              Set a daily goal. Check in every day. <br />
              Miss a day, and your streak dies forever.
            </p>
            <WalletButton />
          </div>
        ) : (
          <>
            {streakData && (
              <StreakDisplay
                streak={Number(streakData[0])}
                bestStreak={Number(streakData[1])}
                totalCheckIns={Number(streakData[2])}
                goal={streakData[3]}
              />
            )}
            
            <div className="mt-12 w-full flex justify-center">
              <CheckIn 
                hasGoal={!!streakData?.[5]} 
                canCheckIn={!!canCheckIn}
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
