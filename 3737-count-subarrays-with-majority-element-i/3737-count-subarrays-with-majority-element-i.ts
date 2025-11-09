const countMajoritySubarrays = (nums: number[], target: number): number => {
    const n = nums.length;
    let count = 0;
    
    // Try each starting position
    for (let i = 0; i < n; i++) {
        let targetCount = 0;
        
        // Extend to each ending position
        for (let j = i; j < n; j++) {
            // Update target count
            if (nums[j] === target) {
                targetCount++;
            }
            
            const length = j - i + 1;
            
            // Check if target is majority: count > length / 2
            // Equivalent to: 2 * count > length
            if (2 * targetCount > length) {
                count++;
            }
        }
    }
    
    return count;

};