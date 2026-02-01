const longestSubsequence = (nums: number[]): number => {
    let maxLen = 0;
    
    // Try each bit position
    for (let bit = 0; bit < 30; bit++) {
        const mask = 1 << bit;
        
        // Filter numbers that have this bit set
        const filtered: number[] = [];
        for (const num of nums) {
            if ((num & mask) !== 0) {
                filtered.push(num);
            }
        }
        
        if (filtered.length === 0) continue;
        
        // Find LIS in filtered array
        const lis = findLIS(filtered);
        maxLen = Math.max(maxLen, lis);
    }
    
    return maxLen;
};

const findLIS = (arr: number[]): number => {
    const tails: number[] = [];
    
    for (const num of arr) {
        // Binary search for position
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
};