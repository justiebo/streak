import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';
import { stringToHex, size } from 'viem';

// ERC-8021 Builder Code Attribution
// Format: 0x + ASCII(builderCode) + hex(length, 1 byte) + 00 + 80218021802180218021802180218021
export const getBuilderSuffix = (builderCode: string) => {
  if (!builderCode) return '0x';
  
  const codeHex = stringToHex(builderCode).slice(2); // Remove 0x
  const lengthHex = size(stringToHex(builderCode)).toString(16).padStart(2, '0');
  const suffix = `0x${codeHex}${lengthHex}00802180218021802180218021802180218021`;
  return suffix as `0x${string}`;
};

export const BUILDER_CODE = process.env.VITE_BUILDER_CODE || 'bc_n3cuyjbp';

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected(),
    coinbaseWallet({ 
      appName: 'STREAK',
      preference: 'smartWalletOnly'
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
