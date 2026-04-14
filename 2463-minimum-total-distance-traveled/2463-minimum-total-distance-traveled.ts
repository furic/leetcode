const minimumTotalDistance = (robot: number[], factory: number[][]): number => {
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const UNREACHABLE = 1e20;
    const robotCount = robot.length;
    const factoryCount = factory.length;

    // dp[i][j] = min total distance for robots[i..n-1] assigned to factories[j..m-1]
    const dp: number[][] = Array.from(
        { length: robotCount + 1 },
        () => Array(factoryCount + 1).fill(0)
    );

    // No factories left but robots remain → impossible
    for (let i = 0; i < robotCount; i++) dp[i][factoryCount] = UNREACHABLE;

    // Fill right-to-left over factories, right-to-left over robots
    for (let factoryIdx = factoryCount - 1; factoryIdx >= 0; factoryIdx--) {
        const [factoryPos, capacity] = factory[factoryIdx];

        // prefix[i] = sum of |robot[k] - factoryPos| for k in [i, n-1], accumulated as i decreases
        let distanceSuffix = 0;

        // Monotonic deque of [robotIdx, adjustedValue] where adjustedValue = dp[i][factoryIdx+1] - distanceSuffix
        // Tracks the minimum (dp[i][j+1] - distanceSuffix) within the current factory's capacity window
        const deque: [number, number][] = [[robotCount, 0]];

        for (let robotIdx = robotCount - 1; robotIdx >= 0; robotIdx--) {
            distanceSuffix += Math.abs(robot[robotIdx] - factoryPos);

            // Evict deque front if it's outside the capacity window [robotIdx, robotIdx + capacity]
            while (deque.length && deque[0][0] > robotIdx + capacity)
                deque.shift();

            // Maintain ascending order in deque (drop worse candidates from back)
            const adjustedValue = dp[robotIdx][factoryIdx + 1] - distanceSuffix;
            while (deque.length && deque[deque.length - 1][1] >= adjustedValue)
                deque.pop();

            deque.push([robotIdx, adjustedValue]);

            // Best assignment: pick minimum adjusted value, restore with distanceSuffix
            dp[robotIdx][factoryIdx] = deque[0][1] + distanceSuffix;
        }
    }

    return dp[0][0];
};