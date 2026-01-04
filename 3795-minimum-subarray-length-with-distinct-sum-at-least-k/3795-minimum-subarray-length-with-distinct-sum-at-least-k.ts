const minLength = (nums: number[], k: number): number => {
    const n = nums.length;
    let minLen = Infinity;
    let left = 0;
    const count = new Map<number, number>();
    let distinctSum = 0;
    
    for (let right = 0; right < n; right++) {
        // Add nums[right] to window
        if (!count.has(nums[right])) {
            distinctSum += nums[right];
        }
        count.set(nums[right], (count.get(nums[right]) || 0) + 1);
        
        // Try to shrink window while sum >= k
        while (distinctSum >= k) {
            minLen = Math.min(minLen, right - left + 1);
            
            // Remove nums[left] from window
            const leftVal = nums[left];
            count.set(leftVal, count.get(leftVal) - 1);
            if (count.get(leftVal) === 0) {
                count.delete(leftVal);
                distinctSum -= leftVal;
            }
            left++;
        }
    }
    
    return minLen === Infinity ? -1 : minLen;
};