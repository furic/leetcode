const minOperations = (nums: number[]): number => {
  const monotonicStack: number[] = [];
  const frequencyMap = new Map<number, number>();
  let currentMax = -1;
  let operationCount = 0;

  for (const num of nums) {
    // If the stack is empty or non-decreasing, just push the current number
    if (monotonicStack.length === 0 || monotonicStack[monotonicStack.length - 1] <= num) {
      monotonicStack.push(num);
    } else {
      // Process and count all values in the stack that are greater than current number
      while (monotonicStack.length && monotonicStack[monotonicStack.length - 1] > num) {
        const popped = monotonicStack.pop()!;
        frequencyMap.set(popped, (frequencyMap.get(popped) ?? 0) + 1);

        if (popped !== currentMax) {
          currentMax = popped;
          operationCount++;
        }
      }

      monotonicStack.push(num);
      currentMax = -1; // Reset for next segment
    }
  }

  // Process remaining stack elements
  while (monotonicStack.length) {
    const popped = monotonicStack.pop()!;
    if (popped === 0) continue;

    frequencyMap.set(popped, (frequencyMap.get(popped) ?? 0) + 1);

    if (popped !== currentMax) {
      currentMax = popped;
      operationCount++;
    }
  }

  return operationCount;
};