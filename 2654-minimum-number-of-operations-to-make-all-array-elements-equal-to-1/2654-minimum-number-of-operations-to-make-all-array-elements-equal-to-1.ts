function minOperations(nums: number[]): number {
    const n: number = nums.length;
    let num1: number = 0;
    let g: number = 0;

    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const temp: number = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    for (const x of nums) {
        if (x === 1) {
            num1++;
        }
        g = gcd(g, x);
    }

    if (num1 > 0) {
        return n - num1;
    }
    if (g > 1) {
        return -1;
    }

    let minLen: number = n;
    for (let i = 0; i < n; i++) {
        let currentGcd: number = 0;
        for (let j = i; j < n; j++) {
            currentGcd = gcd(currentGcd, nums[j]);
            if (currentGcd === 1) {
                minLen = Math.min(minLen, j - i + 1);
                break;
            }
        }
    }
    return minLen + n - 2;
}