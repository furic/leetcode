const minSwaps = (nums: number[]): number => {
    // Precompute digit sums and store them with original index
    const numInfo = nums.map((val, idx) => ({
        val,
        idx,
        sum: val.toString().split('').reduce((sum, d) => sum + Number(d), 0),
    }));

    // Create sorted version based on digit sum and value
    const sorted = [...numInfo].sort((a, b) =>
        a.sum !== b.sum ? a.sum - b.sum : a.val - b.val
    );

    // Build mapping from original index to sorted index
    const indexMap = new Array(nums.length);
    sorted.forEach((item, sortedIdx) => {
        indexMap[item.idx] = sortedIdx;
    });

    console.log(indexMap);

    // Count cycles to determine minimum swaps
    const visited = new Array(nums.length).fill(false);
    let swaps = 0;

    for (let i = 0; i < nums.length; i++) {
        if (visited[i] || indexMap[i] === i) continue;

        let cycleSize = 0;
        let j = i;

        while (!visited[j]) {
            visited[j] = true;
            j = indexMap[j];
            cycleSize++;
        }

        if (cycleSize > 1) {
            swaps += cycleSize - 1;
        }
    }

    return swaps;
};