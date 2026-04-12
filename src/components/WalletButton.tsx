import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Connected</span>
          <span className="text-xs font-mono text-accent">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="p-2 border border-border-custom hover:bg-white/5 transition-colors rounded-sm"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="flex items-center gap-2 px-4 py-2 bg-accent text-black font-display text-xl tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      <Wallet size={20} />
      CONNECT WALLET
    </button>
  );
}
