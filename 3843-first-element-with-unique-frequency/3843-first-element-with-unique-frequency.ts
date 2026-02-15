/**
 * Finds first element whose frequency is unique (no other element has same frequency)
 * Strategy: Count frequencies → group by frequency → find unique → scan for first
 */
const firstUniqueFreq = (nums: number[]): number => {
    // Count frequency of each number
    const numberFrequency = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        numberFrequency.set(nums[i], (numberFrequency.get(nums[i]) || 0) + 1);
    }
    
    // Group numbers by their frequency: frequency → [numbers with that frequency]
    const frequencyToNumbers = new Map<number, number[]>();
    for (const [number, frequency] of numberFrequency.entries()) {
        if (!frequencyToNumbers.has(frequency)) frequencyToNumbers.set(frequency, []);
        frequencyToNumbers.get(frequency).push(number);
    }
    
    // Collect numbers that have unique frequency (only one number has that count)
    const numbersWithUniqueFreq = new Set<number>();
    for (const [frequency, numbersWithFreq] of frequencyToNumbers.entries()) {
        if (numbersWithFreq.length === 1) numbersWithUniqueFreq.add(numbersWithFreq[0]);
    }
    
    // Find first element in original array with unique frequency
    for (let i = 0; i < nums.length; i++) {
        if (numbersWithUniqueFreq.has(nums[i])) return nums[i];
    }
    
    return -1;
};