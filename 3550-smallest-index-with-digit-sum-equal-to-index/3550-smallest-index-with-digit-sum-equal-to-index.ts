const smallestIndex = (nums: number[]): number => {
    for (let i = 0; i < nums.length; i++) {
        if (
            i ===
            nums[i]
                .toString()
                .split("")
                .reduce((sum, digit) => sum + Number(digit), 0)
        )
            return i;
    }
    return -1;
};
