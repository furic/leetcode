function mergeAdjacent(nums: number[]): number[] {
    const n = nums.length;
    const stack = new Array<number>(n);
    let size = 0;
    for (let i = 0; i < n; i++) {
        const num = nums[i];
        stack[size++] = num;
        for (; size >= 2 && stack[size - 1] === stack[size - 2];) {
            stack[size - 2] *= 2;
            size--;
        }
    }
    return stack.slice(0, size);
};