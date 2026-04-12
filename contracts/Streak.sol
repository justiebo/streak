// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title Streak
 * @dev A daily onchain commitment tracker for the Base ecosystem.
 */
contract Streak {
    struct UserStreak {
        uint256 currentStreak;
        uint256 bestStreak;
        uint256 totalCheckIns;
        uint256 lastCheckInTimestamp;
        string goal;
        bool hasGoal;
    }

    mapping(address => UserStreak) public userStreaks;

    event GoalSet(address indexed user, string goal);
    event CheckedIn(address indexed user, uint256 currentStreak, uint256 timestamp);
    event StreakReset(address indexed user, uint256 timestamp);

    /**
     * @dev Sets or updates the user's commitment goal.
     */
    function setGoal(string calldata _goal) external {
        UserStreak storage streak = userStreaks[msg.sender];
        streak.goal = _goal;
        streak.hasGoal = true;
        emit GoalSet(msg.sender, _goal);
    }

    /**
     * @dev Checks in for the day. Resets streak if a day was missed.
     */
    function checkIn() external {
        UserStreak storage streak = userStreaks[msg.sender];
        require(streak.hasGoal, "Set a goal first");
        
        uint256 currentTime = block.timestamp;
        uint256 lastTime = streak.lastCheckInTimestamp;
        
        // Calculate days since last check-in (UTC days)
        // 86400 seconds in a day
        uint256 currentDay = currentTime / 86400;
        uint256 lastDay = lastTime / 86400;

        require(currentDay > lastDay, "Already checked in today");

        if (currentDay == lastDay + 1) {
            // Consecutive day
            streak.currentStreak += 1;
        } else {
            // Missed a day or first time
            if (lastTime != 0) {
                emit StreakReset(msg.sender, currentTime);
            }
            streak.currentStreak = 1;
        }

        if (streak.currentStreak > streak.bestStreak) {
            streak.bestStreak = streak.currentStreak;
        }

        streak.totalCheckIns += 1;
        streak.lastCheckInTimestamp = currentTime;

        emit CheckedIn(msg.sender, streak.currentStreak, currentTime);
    }

    /**
     * @dev Returns whether the user can check in today.
     */
    function canCheckIn(address _user) external view returns (bool) {
        UserStreak storage streak = userStreaks[_user];
        if (!streak.hasGoal) return false;
        
        uint256 currentDay = block.timestamp / 86400;
        uint256 lastDay = streak.lastCheckInTimestamp / 86400;
        
        return currentDay > lastDay;
    }

    /**
     * @dev Returns full streak data for an address.
     */
    function getStreak(address _user) external view returns (
        uint256 currentStreak,
        uint256 bestStreak,
        uint256 totalCheckIns,
        string memory goal,
        uint256 lastCheckInTimestamp,
        bool hasGoal
    ) {
        UserStreak storage streak = userStreaks[_user];
        
        // Check if they missed a day to return accurate "current" streak
        uint256 currentDay = block.timestamp / 86400;
        uint256 lastDay = streak.lastCheckInTimestamp / 86400;
        
        uint256 effectiveCurrentStreak = streak.currentStreak;
        if (streak.lastCheckInTimestamp != 0 && currentDay > lastDay + 1) {
            effectiveCurrentStreak = 0;
        }

        return (
            effectiveCurrentStreak,
            streak.bestStreak,
            streak.totalCheckIns,
            streak.goal,
            streak.lastCheckInTimestamp,
            streak.hasGoal
        );
    }
}
