const mergeAdjacent = (nums: number[]): number[] => {
    const stack: number[] = [];
    
    for (const num of nums) {
        stack.push(num);
        
        // Keep merging backwards while top two elements are equal
        while (stack.length >= 2 && stack[stack.length - 1] === stack[stack.length - 2]) {
            const val = stack.pop()!;
            stack.pop();
            stack.push(val * 2);
        }
    }
    
    return stack;
};