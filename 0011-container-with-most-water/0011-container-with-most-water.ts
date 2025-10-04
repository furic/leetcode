const maxArea = (height: number[]): number => {
    let maxWaterArea = 0;
    let leftPointer = 0;
    let rightPointer = height.length - 1;
    
    // Use two pointers moving inward to find maximum container area
    while (leftPointer < rightPointer) {
        const containerWidth = rightPointer - leftPointer;
        const containerHeight = Math.min(height[leftPointer], height[rightPointer]);
        const currentArea = containerWidth * containerHeight;
        
        maxWaterArea = Math.max(currentArea, maxWaterArea);
        
        // Move the pointer with the shorter height (greedy: taller line has more potential)
        if (height[leftPointer] <= height[rightPointer]) {
            leftPointer++;
        } else {
            rightPointer--;
        }
    }
    
    return maxWaterArea;
};