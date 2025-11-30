const countElements = (nums: number[], k: number): number => {
    const n = nums.length;
    
    // When k = 0, all elements qualify
    if (k === 0) return n;
    
    if (k >= n) return 0;
    
    const sorted = [...nums].sort((a, b) => a - b);
    
    // Elements strictly less than the k-th largest have at least k elements greater
    const threshold = sorted[n - k];
    
    return nums.filter(x => x < threshold).length;
};