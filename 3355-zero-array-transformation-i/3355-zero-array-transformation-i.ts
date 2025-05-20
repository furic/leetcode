const isZeroArray = (nums: number[], queries: number[][]): boolean => {
    const n = nums.length;
    const decrementMarks = new Array(n + 1).fill(0);

    for (const [start, end] of queries) {
        decrementMarks[start]--;
        decrementMarks[end + 1]++;
    }

    let appliedDecrement = 0;
    for (let i = 0; i < n; i++) {
        appliedDecrement += decrementMarks[i];
        const finalValue = nums[i] + appliedDecrement;
        if (finalValue > 0) return false;
    }

    return true;
};