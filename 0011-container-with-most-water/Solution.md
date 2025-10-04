# Two Pointer Greedy | 17 Lines | O(n) | 2ms

# Intuition
The area of water a container can hold is determined by the width between two lines and the height of the shorter line. To maximize area, we want to consider the widest possible container first, then strategically move inward while looking for taller lines.

# Approach
We use a two-pointer technique starting from opposite ends of the array. Initialize `leftPointer` at index 0 and `rightPointer` at the last index to begin with the maximum possible width. At each step, calculate the current container's area using the formula: area = width × height, where width is the distance between pointers and height is the minimum of the two line heights (since water level is limited by the shorter line).

The critical optimization is deciding which pointer to move. If we move the pointer at the taller line, we guarantee a smaller width and cannot improve height (the shorter line still limits us). However, moving the pointer at the shorter line gives us a chance to find a taller line that could compensate for the reduced width. Therefore, we always move the pointer pointing to the shorter line inward.

We continue this process, comparing each new area against our running maximum, until the pointers meet. This greedy approach ensures we consider all potentially optimal configurations without checking every pair, reducing time complexity from O(n²) to O(n).

# Complexity
- Time complexity: $$O(n)$$ where n is the length of the height array
- Space complexity: $$O(1)$$

# Code
```typescript
const maxArea = (height: number[]): number => {
    let maxWaterArea = 0;
    let leftPointer = 0;
    let rightPointer = height.length - 1;
    
    while (leftPointer < rightPointer) {
        const containerWidth = rightPointer - leftPointer;
        const containerHeight = Math.min(height[leftPointer], height[rightPointer]);
        const currentArea = containerWidth * containerHeight;
        
        maxWaterArea = Math.max(currentArea, maxWaterArea);
        
        if (height[leftPointer] <= height[rightPointer]) {
            leftPointer++;
        } else {
            rightPointer--;
        }
    }
    
    return maxWaterArea;
};
```