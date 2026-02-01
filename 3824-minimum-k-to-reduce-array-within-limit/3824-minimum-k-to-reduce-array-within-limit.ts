const minimumK = (nums: number[]): number => {
    const countOps = (k: number): number => {
        let ops = 0;
        for (const num of nums) {
            ops += Math.ceil(num / k);
        }
        return ops;
    };
    
    let left = 1;
    // Upper bound: worst case is when k is large, ops = n, so k² ≥ n → k ≥ √n
    // Also consider max element. Safe bound: max(maxElement, √(n * maxElement))
    const maxElement = Math.max(...nums);
    let right = Math.max(maxElement, Math.ceil(Math.sqrt(nums.length * maxElement)));
    let result = right;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const ops = countOps(mid);
        
        if (ops <= mid * mid) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
};