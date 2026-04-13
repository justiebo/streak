export const STREAK_CONTRACT_ADDRESS = (process.env.VITE_STREAK_ADDRESS || '0x854469b2E8b516404D6bAdc70608A7FC50670C9D') as `0x${string}`;

export const STREAK_ABI = [
  {
    "inputs": [],
    "name": "checkIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "habitCheckIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getStreak",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "visitStreak",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "habitStreak",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "goal",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "lastVisitTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastHabitTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "hasGoal",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_goal",
        "type": "string"
      }
    ],
    "name": "setGoal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "currentStreak",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "AppCheckedIn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "goal",
        "type": "string"
      }
    ],
    "name": "GoalSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "currentStreak",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "HabitCheckedIn",
    "type": "event"
  }
] as const;
