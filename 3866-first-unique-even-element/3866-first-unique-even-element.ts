const firstUniqueEven = (nums: number[]): number => {
    const frequency = new Map<number, number>();
    for (const num of nums) frequency.set(num, (frequency.get(num) ?? 0) + 1);
    return nums.find(num => num % 2 === 0 && frequency.get(num) === 1) ?? -1;
};