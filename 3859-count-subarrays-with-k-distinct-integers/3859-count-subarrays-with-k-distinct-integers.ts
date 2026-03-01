const countSubarrays = (nums: number[], k: number, m: number): number => {
    const n = nums.length;
    let result = 0;

    // Window tracking total distinct count (to enforce totalDistinct ≤ k)
    const freqTotal = new Map<number, number>();
    let totalDistinct = 0;
    let minLeft = 0;

    // Window tracking qualified count (distinct values with freq ≥ m, to enforce qualifiedCount ≥ k)
    const freqQualified = new Map<number, number>();
    let qualifiedDistinct = 0;
    let maxLeft = 0;

    for (let right = 0; right < n; right++) {
        const val = nums[right];

        // Expand both windows to include nums[right]
        freqTotal.set(val, (freqTotal.get(val) ?? 0) + 1);
        if (freqTotal.get(val) === 1) totalDistinct++;

        freqQualified.set(val, (freqQualified.get(val) ?? 0) + 1);
        if (freqQualified.get(val) === m) qualifiedDistinct++;

        // Advance minLeft until totalDistinct ≤ k
        while (totalDistinct > k) {
            const leaving = nums[minLeft++];
            freqTotal.set(leaving, freqTotal.get(leaving)! - 1);
            if (freqTotal.get(leaving) === 0) totalDistinct--;
        }

        // Advance maxLeft as far as possible while qualifiedDistinct ≥ k
        while (qualifiedDistinct >= k) {
            const leaving = nums[maxLeft++];
            freqQualified.set(leaving, freqQualified.get(leaving)! - 1);
            if (freqQualified.get(leaving) === m - 1) qualifiedDistinct--;
        }

        // Valid left endpoints: minLeft ≤ left < maxLeft
        // Since qualifiedCount ≥ k implies totalDistinct ≥ k,
        // combined with totalDistinct ≤ k, we get exactly k distinct, all with freq ≥ m
        result += Math.max(0, maxLeft - minLeft);
    }

    return result;
};