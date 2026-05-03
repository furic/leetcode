const countOppositeParity = (nums: number[]): number[] => {
    const parityCount = [0, 0]; // [evenCount, oddCount]

    for (let i = nums.length - 1; i >= 0; i--) {
        const parity = nums[i] & 1;
        nums[i] = parityCount[1 ^ parity]; // count of opposite parity seen so far
        parityCount[parity]++;
    }

    return nums;
};