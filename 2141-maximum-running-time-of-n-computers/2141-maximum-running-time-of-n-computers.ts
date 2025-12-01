/**
 * Finds the maximum minutes all n computers can run simultaneously
 * Uses binary search on runtime + greedy check for feasibility
 */
const maxRunTime = (n: number, batteries: number[]): number => {
    const totalBatteryPower = batteries.reduce((sum, battery) => sum + battery, 0);

    /**
     * Checks if all n computers can run for targetRuntime minutes
     * Key insight: each battery contributes at most min(capacity, targetRuntime) minutes
     * (no point using more than targetRuntime from any single battery)
     */
    const canRunAllComputers = (targetRuntime: number): boolean => {
        const totalMinutesNeeded = n * targetRuntime;
        let usableMinutes = 0;

        for (const batteryCapacity of batteries) {
            usableMinutes += Math.min(batteryCapacity, targetRuntime);
            // Early exit optimization
            if (usableMinutes >= totalMinutesNeeded) return true;
        }

        return false;
    };

    // Binary search for maximum feasible runtime
    let left = 1;
    let right = Math.floor(totalBatteryPower / n); // Upper bound: evenly distributed power

    while (left <= right) {
        const midRuntime = Math.floor((left + right) / 2);

        if (canRunAllComputers(midRuntime)) {
            left = midRuntime + 1; // Try for longer runtime
        } else {
            right = midRuntime - 1; // Reduce target runtime
        }
    }

    return right;
};