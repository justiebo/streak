# STREAK — Daily Onchain Commitment

STREAK is a minimalist Web3 application built for the Base ecosystem. It allows users to set a daily goal and check in onchain to build a public streak.

## Features
- **Onchain Commitment**: Your goal and streak are recorded permanently on the Base blockchain.
- **Daily Check-ins**: Check in once per UTC day to increment your streak.
- **Public Profiles**: View the streak and goal of any wallet address.
- **Builder Attribution**: Implements ERC-8021 Builder Code attribution for ecosystem rewards.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Web3**: Wagmi v2 + Viem
- **Smart Contract**: Solidity 0.8.24
- **Animations**: Motion (framer-motion)

## Getting Started

### 1. Deploy the Smart Contract
1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new file `Streak.sol` and paste the content from `contracts/Streak.sol`.
3. Compile using version **0.8.24** (EVM: Paris, Optimization: 200).
4. Deploy to **Base** or **Base Sepolia**.
5. Copy the deployed contract address.

### 2. Configure Environment Variables
Create a `.env` file (or set in your hosting provider):
```env
VITE_STREAK_ADDRESS="YOUR_DEPLOYED_CONTRACT_ADDRESS"
VITE_BUILDER_CODE="YOUR_BUILDER_CODE"
```

### 3. Install and Run
```bash
npm install
npm run dev
```

## Smart Contract Functions
- `setGoal(string goal)`: Set your commitment text.
- `checkIn()`: Increment your streak (once per day).
- `getStreak(address)`: View full streak data for any user.
- `canCheckIn(address)`: Check if a user is eligible to check in today.

## Design Philosophy
STREAK uses "Expensive Minimalism" — a dark, high-contrast theme with sharp accents (#FF5F1F) and bold typography (Bebas Neue).
