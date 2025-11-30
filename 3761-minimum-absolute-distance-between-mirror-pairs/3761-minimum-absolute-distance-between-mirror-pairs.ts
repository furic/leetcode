const minMirrorPairDistance = (nums: number[]): number => {
    const reverse = (n: number): number => {
        return parseInt(n.toString().split('').reverse().join(''));
    };
    
    // Map: reversed number -> latest index where it appears
    const reversedLastIndex = new Map<number, number>();
    let minDist = Infinity;
    
    for (let j = 0; j < nums.length; j++) {
        // Check if nums[j] equals reverse of any earlier number
        if (reversedLastIndex.has(nums[j])) {
            const i = reversedLastIndex.get(nums[j])!;
            minDist = Math.min(minDist, j - i);
        }
        
        // Store reverse of current number with its index
        const reversed = reverse(nums[j]);
        reversedLastIndex.set(reversed, j);
    }
    
    return minDist === Infinity ? -1 : minDist;
};