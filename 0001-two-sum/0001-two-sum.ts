const twoSum = (nums: number[], target: number): number[] => {
    const valueToIndex = new Map<number, number>();
    
    for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
        const currentNumber = nums[currentIndex];
        const complement = target - currentNumber;
        
        if (valueToIndex.has(complement)) {
            return [valueToIndex.get(complement)!, currentIndex];
        }
        
        valueToIndex.set(currentNumber, currentIndex);
    }
    
    return [];
};