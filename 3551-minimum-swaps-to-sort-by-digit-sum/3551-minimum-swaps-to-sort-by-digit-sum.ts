const minSwaps = (nums: number[]): number => {
    const n = nums.length;

    const digitSum: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let x = nums[i]; x > 0; x = Math.floor(x / 10)) sum += x % 10;
        digitSum[i] = sum;
    }

    // Original indices ordered by (digit sum, value) -- the sorted order we need to reach
    const sortedOrder: number[] = Array.from({ length: n }, (_, i) => i);
    sortedOrder.sort((a, b) =>
        digitSum[a] !== digitSum[b] ? digitSum[a] - digitSum[b] : nums[a] - nums[b]
    );

    // targetPos[i] = where the element currently at index i belongs
    const targetPos: number[] = new Array(n);
    for (let pos = 0; pos < n; pos++) targetPos[sortedOrder[pos]] = pos;

    // Minimum swaps = n - (number of cycles in the permutation)
    const visited: boolean[] = new Array(n).fill(false);
    let cycles = 0;
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        cycles++;
        for (let j = i; !visited[j]; j = targetPos[j]) visited[j] = true;
    }

    return n - cycles;
};