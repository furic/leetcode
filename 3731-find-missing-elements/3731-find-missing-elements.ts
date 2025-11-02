const findMissingElements = (nums: number[]): number[] => {
    const rangeStart = Math.min(...nums);
    const rangeEnd = Math.max(...nums);
    const existingNumbers = new Set(nums);
    
    return Array.from(
        { length: rangeEnd - rangeStart + 1 }, 
        (_, index) => rangeStart + index
    ).filter(number => !existingNumbers.has(number));

};