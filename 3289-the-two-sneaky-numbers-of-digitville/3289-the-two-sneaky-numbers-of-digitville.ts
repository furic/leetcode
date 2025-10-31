const getSneakyNumbers = (nums: number[]): number[] => {
    const seenNumbers = new Set<number>();
    const duplicates: number[] = [];
    
    for (let index = 0; index < nums.length; index++) {
        const currentNumber = nums[index];
        
        if (seenNumbers.has(currentNumber)) {
            // Found a duplicate - this is a sneaky number!
            duplicates.push(currentNumber);
        } else {
            // First time seeing this number, track it
            seenNumbers.add(currentNumber);
        }
    }
    
    return duplicates;
};