const countSubarrays = (nums: number[], k: number): number => {
    const n = nums.length;
    let count = 0;
    let left = 0;
    
    // Deques store indices (use arrays with pointer to avoid shift() O(n))
    const minDeque: number[] = []; // Increasing values (front = min)
    const maxDeque: number[] = []; // Decreasing values (front = max)
    let minStart = 0;
    let maxStart = 0;
    
    for (let right = 0; right < n; right++) {
        // Maintain minDeque: remove larger elements from back
        while (minDeque.length > minStart && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
            minDeque.pop();
        }
        minDeque.push(right);
        
        // Maintain maxDeque: remove smaller elements from back
        while (maxDeque.length > maxStart && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
            maxDeque.pop();
        }
        maxDeque.push(right);
        
        // Shrink window while cost > k
        while (left <= right) {
            // Clean outdated indices
            while (minStart < minDeque.length && minDeque[minStart] < left) minStart++;
            while (maxStart < maxDeque.length && maxDeque[maxStart] < left) maxStart++;
            
            const minVal = nums[minDeque[minStart]];
            const maxVal = nums[maxDeque[maxStart]];
            const cost = (maxVal - minVal) * (right - left + 1);
            
            if (cost <= k) break;
            left++;
        }
        
        // Count all valid subarrays ending at right
        count += right - left + 1;
    }
    
    return count;
};