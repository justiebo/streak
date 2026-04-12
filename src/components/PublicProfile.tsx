import React, { useState } from 'react';
import { useReadContract } from 'wagmi';
import { STREAK_CONTRACT_ADDRESS, STREAK_ABI } from '@/src/lib/contract';
import { Search, Loader2, User } from 'lucide-react';
import { isAddress } from 'viem';

export function PublicProfile() {
  const [searchAddress, setSearchAddress] = useState('');
  const [activeAddress, setActiveAddress] = useState<string | null>(null);

  const { data: streakData, isLoading } = useReadContract({
    address: STREAK_CONTRACT_ADDRESS,
    abi: STREAK_ABI,
    functionName: 'getStreak',
    args: activeAddress ? [activeAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!activeAddress && isAddress(activeAddress),
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddress(searchAddress)) {
      setActiveAddress(searchAddress);
    }
  };

  return (
    <div className="w-full max-w-md mt-20 pt-20 border-t border-border-custom">
      <h3 className="text-xl font-display tracking-widest text-white/40 mb-6 uppercase">View Any Streak</h3>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="0X... ADDRESS"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className="flex-1 bg-surface border border-border-custom p-3 font-mono text-xs focus:border-accent outline-none transition-colors"
        />
        <button
          type="submit"
          className="p-3 bg-white/5 border border-border-custom hover:bg-white/10 transition-colors"
        >
          <Search size={18} />
        </button>
      </form>

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-accent" />
        </div>
      )}

      {streakData && activeAddress && (
        <div className="p-6 border border-border-custom bg-surface/20">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-accent" size={20} />
            <span className="text-xs font-mono text-white/60">
              {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
            </span>
          </div>
          
          {streakData[5] ? ( // hasGoal
            <>
              <div className="text-5xl font-display text-accent mb-1">{Number(streakData[0])}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Current Streak</div>
              <div className="text-lg font-display text-white uppercase tracking-wide">
                {streakData[3]}
              </div>
            </>
          ) : (
            <div className="text-sm text-white/40 italic uppercase tracking-widest">
              No goal set for this address
            </div>
          )}
        </div>
      )}
    </div>
  );
}
