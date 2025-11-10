const minOperations = (nums: number[]): number => {
    const activeStack: number[] = [];
    let operationCount = 0;

    for (const currentValue of nums) {
        // Remove elements from stack that are larger than current value
        // These would have been cleared by operations on smaller values
        while (activeStack.length > 0 && activeStack[activeStack.length - 1] > currentValue) {
            activeStack.pop();
        }

        // Skip zeros (already cleared)
        if (currentValue === 0) {
            continue;
        }

        // If current value is new (not in stack or larger than top), need new operation
        if (activeStack.length === 0 || activeStack[activeStack.length - 1] < currentValue) {
            operationCount++;
            activeStack.push(currentValue);
        }
        // If current value equals top of stack, it's already handled by previous operation
    }

    return operationCount;
};