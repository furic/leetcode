const maximumAND = (nums: number[], k: number, m: number): number => {
    // Find minimum k >= delta with k & target == 0
    const minK = (delta: number, target: number): number => {
        let result = delta;
        while (result & target) {
            const lowbit = result & target & -(result & target);
            result = (result | (lowbit - 1)) + 1;
        }
        return result;
    };

    // Cost to make x have all bits of target
    const cost = (x: number, target: number): number => {
        if ((x & target) === target) return 0;
        if (x <= target) return target - x;
        const delta = x - target;
        const padding = minK(delta, target);
        return target + padding - x;
    };

    // Check if target is achievable with budget k
    const canAchieve = (target: number): boolean => {
        const costs = nums.map((x) => cost(x, target));
        costs.sort((a, b) => a - b);
        let total = 0;
        for (let i = 0; i < m; i++) {
            total += costs[i];
            if (total > k) return false;
        }
        return true;
    };

    // Greedy: build answer bit by bit from high to low
    let answer = 0;
    // 2^30 = 1,073,741,824 ≈ 1.07 × 10^9
    for (let b = 30; b >= 0; b--) {
        const candidate = answer | (1 << b);
        if (canAchieve(candidate)) {
            answer = candidate;
        }
    }

    return answer;
};
