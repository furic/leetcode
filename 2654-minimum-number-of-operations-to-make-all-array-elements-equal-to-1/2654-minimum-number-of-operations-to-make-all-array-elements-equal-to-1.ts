function minOperations(nums: number[]): number {
    const n = nums.length;
    let num1 = 0;
    let g = 0;

    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
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

    let minLen = n;
    for (let i = 0; i < n; i++) {
        let currentGcd = 0;
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