const lexicographicallySmallestArray = (nums: number[], limit: number): number[] => {
    const n = nums.length;

    // Sort by value, keeping track of original indices
    const sorted = nums.map((val, idx) => ({ val, idx }))
                       .sort((a, b) => a.val - b.val);

    const result = new Array(n);
    let i = 0;

    while (i < n) {
        // Find the extent of this "swappable group" (consecutive sorted values within limit)
        let j = i + 1;
        while (j < n && sorted[j].val - sorted[j - 1].val <= limit) j++;

        // Sort the original indices of this group, then assign sorted values in order
        const groupIndices = sorted.slice(i, j).map(p => p.idx).sort((a, b) => a - b);
        for (let k = 0; k < groupIndices.length; k++)
            result[groupIndices[k]] = sorted[i + k].val;

        i = j;
    }

    return result;
};