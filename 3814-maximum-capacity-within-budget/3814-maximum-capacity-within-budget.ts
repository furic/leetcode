const maxCapacity = (
    costs: number[],
    capacity: number[],
    budget: number
): number => {
    const n = costs.length;
    let maxCap = 0;

    for (let i = 0; i < n; i++) {
        if (costs[i] < budget) {
            maxCap = Math.max(maxCap, capacity[i]);
        }
    }

    const machines = costs.map((cost, i) => ({ cost, cap: capacity[i] }));
    machines.sort((a, b) => a.cost - b.cost);

    const prefixTop2 = new Array(n);
    prefixTop2[0] = [machines[0].cap, 0];

    for (let i = 1; i < n; i++) {
        const [prevMax, prevSecond] = prefixTop2[i - 1];
        const curr = machines[i].cap;

        if (curr >= prevMax) {
            prefixTop2[i] = [curr, prevMax];
        } else if (curr > prevSecond) {
            prefixTop2[i] = [prevMax, curr];
        } else {
            prefixTop2[i] = [prevMax, prevSecond];
        }
    }

    for (let i = 0; i < n; i++) {
        const maxPartnerCost = budget - machines[i].cost - 1;

        let left = 0,
            right = n - 1,
            bestIdx = -1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (machines[mid].cost <= maxPartnerCost) {
                bestIdx = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (bestIdx >= 0 && bestIdx !== i) {
            const [max1, max2] = prefixTop2[bestIdx];

            if (i <= bestIdx && machines[i].cap === max1 && max2 > 0) {
                maxCap = Math.max(maxCap, machines[i].cap + max2);
            } else {
                maxCap = Math.max(maxCap, machines[i].cap + max1);
            }
        }
    }

    return maxCap;
};
