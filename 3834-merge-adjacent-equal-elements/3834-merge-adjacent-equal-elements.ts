/**
 * Merges adjacent equal elements repeatedly until no more merges possible
 * Strategy: Use stack to track elements, merge backwards when top two are equal
 * Each merge doubles the value (sum of two equal elements)
 */
const mergeAdjacent = (nums: number[]): number[] => {
    const arrayLength = nums.length;
    const stack = new Array<number>(arrayLength);
    let stackSize = 0;
    
    for (let i = 0; i < arrayLength; i++) {
        const currentValue = nums[i];
        stack[stackSize++] = currentValue;
        
        // Keep merging while top two stack elements are equal
        for (; stackSize >= 2 && stack[stackSize - 1] === stack[stackSize - 2];) {
            stack[stackSize - 2] *= 2;  // Double the lower element (sum of two equal values)
            stackSize--;                 // Remove top element
        }
    }
    
    return stack.slice(0, stackSize);
};