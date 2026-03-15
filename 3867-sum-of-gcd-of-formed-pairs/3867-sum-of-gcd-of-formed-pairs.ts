const gcdSum = (nums: number[]): number => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    let prefixMax = 0;
    const prefixGcd = nums.map((v) => {
        prefixMax = Math.max(prefixMax, v);
        return gcd(v, prefixMax);
    });

    prefixGcd.sort((a, b) => a - b);

    let pairGcdSum = 0;
    let left = 0;
    let right = prefixGcd.length - 1;

    while (left < right) {
        pairGcdSum += gcd(prefixGcd[left], prefixGcd[right]);
        left++;
        right--;
    }

    return pairGcdSum;
};