function maxFrequencyElements(nums: number[]): number {
    const freq = nums.reduce((acc, n) => {
    acc[n] = (acc[n] || 0) + 1;
    return acc;
    }, {} as Record<number, number>);
    const maxFreq = Math.max(...Object.values(freq));
    const total = Object.values(freq).reduce((sum, count) => sum + (count === maxFreq ? count : 0), 0);
    return total;
};