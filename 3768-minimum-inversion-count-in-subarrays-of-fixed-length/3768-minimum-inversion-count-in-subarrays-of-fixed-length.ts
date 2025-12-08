const minInversionCount = (nums: number[], k: number): number => {
    const n = nums.length;
    if (k === 1) return 0;
    
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const compress = new Map<number, number>();
    sorted.forEach((v, i) => compress.set(v, i + 1));
    
    const size = sorted.length;
    
    const tree = new Array(size + 1).fill(0);
    
    const update = (i: number, delta: number) => {
        for (; i <= size; i += i & (-i)) tree[i] += delta;
    };
    
    const query = (i: number): number => {
        let sum = 0;
        for (; i > 0; i -= i & (-i)) sum += tree[i];
        return sum;
    };
    
    let inversions = 0;
    for (let i = 0; i < k; i++) {
        const c = compress.get(nums[i])!;
        inversions += query(size) - query(c);
        update(c, 1);
    }
    
    let minInversions = inversions;
    
    for (let i = 0; i + k < n; i++) {
        const removeVal = nums[i];
        const addVal = nums[i + k];
        
        const removeC = compress.get(removeVal)!;
        const addC = compress.get(addVal)!;
        
        update(removeC, -1);
        
        const inversionsLost = query(removeC - 1);
        inversions -= inversionsLost;
        
        const inversionsGained = query(size) - query(addC);
        inversions += inversionsGained;
        
        update(addC, 1);
        
        minInversions = Math.min(minInversions, inversions);
    }
    
    return minInversions;
};