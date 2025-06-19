const partitionArray = (nums: number[], k: number): number => {
    if (nums.length === 1) return 1;

    const freq = new Array(100001).fill(0);
    let maxVal = -1;

    for (const x of nums) {
        freq[x]++;
        maxVal = Math.max(maxVal, x);
    }

    let partitions = 0;

    for (let x = 0; x <= maxVal;) {
        // Skip unused numbers
        while (x <= maxVal && freq[x] === 0) {
            x++;
        }
        if (x > maxVal) break;

        // Start a new group from current x
        partitions++;
        const end = x + k;

        // Mark all numbers from x to x+k as used
        for (let y = x; y <= end; y++) {
            freq[y] = 0;
        }

        // Move x to the next unprocessed number
        x = end + 1;
    }

    return partitions;
};