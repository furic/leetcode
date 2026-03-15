const minCost = (nums1: number[], nums2: number[]): number => {
    const count1 = new Map<number, number>();
    const count2 = new Map<number, number>();

    for (const v of nums1) count1.set(v, (count1.get(v) ?? 0) + 1);
    for (const v of nums2) count2.set(v, (count2.get(v) ?? 0) + 1);

    const allValues = new Set([...count1.keys(), ...count2.keys()]);

    let swapCount = 0;

    for (const v of allValues) {
        const c1 = count1.get(v) ?? 0;
        const c2 = count2.get(v) ?? 0;
        const total = c1 + c2;

        if (total % 2 !== 0) return -1;

        const targetCount = total / 2;
        const excessInNums1 = c1 - targetCount;

        if (excessInNums1 > 0) swapCount += excessInNums1;
    }

    return swapCount;
};