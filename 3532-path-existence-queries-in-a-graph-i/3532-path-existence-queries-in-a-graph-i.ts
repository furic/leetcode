const pathExistenceQueries = (n: number, nums: number[], maxDiff: number, queries: number[][]): boolean[] => {
    let breaks = new Array(nums.length);
    let breaksPrefix: number = 0;
    breaks[0] = breaksPrefix;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] > maxDiff)
            breaksPrefix++;
        breaks[i] = breaksPrefix;
    }
    console.log(breaks)
    
    return queries.map(([i, j]) => breaks[j] - breaks[i] === 0);
};