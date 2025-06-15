const specialTriplets = (nums: number[]): number => {
    const MOD = 1e9 + 7;
    const n = nums.length;
    
    let result = 0;

    const prefixCount = new Map<number, number>();
    const suffixCount = new Map<number, number>();

    // Initialize suffix count with all elements
    for (const num of nums) {
        suffixCount.set(num, (suffixCount.get(num) || 0) + 1);
    }

    for (const mid of nums) {
        suffixCount.set(mid, suffixCount.get(mid)! - 1); // remove mid from suffix

        const target = mid * 2;
        const left = prefixCount.get(target) || 0;
        const right = suffixCount.get(target) || 0;

        result = (result + left * right) % MOD;

        prefixCount.set(mid, (prefixCount.get(mid) || 0) + 1); // move mid to prefix
    }

    return result;
};