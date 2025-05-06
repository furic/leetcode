const buildArray = (nums: number[]): number[] => {
    const clone = [...nums];
    return nums.map((n) => clone[n]);
};