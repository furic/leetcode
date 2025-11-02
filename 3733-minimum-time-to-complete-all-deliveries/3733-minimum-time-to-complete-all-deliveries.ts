const minimumTime = (deliveries: number[], rechargeIntervals: number[]): number => {
    // Calculate greatest common divisor using Euclidean algorithm
    const calculateGCD = (a: number, b: number): number => {
        return b === 0 ? a : calculateGCD(b, a % b);
    };

    // Binary search bounds
    let minTime = 0;
    let maxTime = 1e18; // Upper bound large enough for all practical cases
    
    // Optimize upper bound based on problem constraints
    const estimatedMax = (deliveries[0] + deliveries[1]) * Math.max(rechargeIntervals[0], rechargeIntervals[1]);
    maxTime = Math.min(maxTime, Math.max(100, estimatedMax));

    // Binary search for minimum time
    while (minTime <= maxTime) {
        const candidateTime = Math.floor((minTime + maxTime) / 2);
        
        // Calculate available delivery slots for each drone individually
        const drone1Slots = candidateTime - Math.floor(candidateTime / rechargeIntervals[0]);
        const drone2Slots = candidateTime - Math.floor(candidateTime / rechargeIntervals[1]);
        
        // Calculate LCM to find overlapping recharge hours
        const gcd = calculateGCD(rechargeIntervals[0], rechargeIntervals[1]);
        const lcm = (rechargeIntervals[0] / gcd) * rechargeIntervals[1];
        
        // Calculate total slots considering both drones can't deliver simultaneously during recharge
        const totalRechargeHours = Math.floor(candidateTime / rechargeIntervals[0]) + 
                                    Math.floor(candidateTime / rechargeIntervals[1]) - 
                                    Math.floor(candidateTime / lcm);
        const totalSlots = candidateTime - totalRechargeHours;
        
        // Check feasibility: each drone individually + combined capacity
        if (drone1Slots >= deliveries[0] && 
            drone2Slots >= deliveries[1] && 
            drone1Slots + drone2Slots - totalSlots >= deliveries[0] + deliveries[1]) {
            // Time is sufficient, try smaller
            maxTime = candidateTime - 1;
        } else {
            // Time is insufficient, need more
            minTime = candidateTime + 1;
        }
    }

    return minTime;
};