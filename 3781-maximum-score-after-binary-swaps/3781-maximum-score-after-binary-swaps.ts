const maximumScore = (nums: number[], s: string): number => {
    const maxHeap = new MaxPriorityQueue<number>();
    let sum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        maxHeap.push(nums[i]);
        if (s[i] === '1') {
            sum += maxHeap.pop();
        }
    }
    return sum;
};