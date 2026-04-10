function minimumDistance(nums: number[]): number {
    const maxVal = Math.max(...nums);
    
    const pos: [number, number][] = Array.from({ length: maxVal + 1 }, () => [-1, -1]);
    
    let res: number = Infinity;

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        const [last, secondLast] = pos[val];

        if (secondLast !== -1) {
            const distance = (i - secondLast) * 2;
            if (distance < res) 
                res = distance;
        }

        pos[val] = [i, last];
    }

    return res === Infinity ? -1 : res;
};