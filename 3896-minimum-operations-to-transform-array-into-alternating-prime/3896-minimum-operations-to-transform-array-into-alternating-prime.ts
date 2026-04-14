const minOperations = (nums: number[]): number => {
    const SIEVE_LIMIT = 200_000;
    const isComposite = new Uint8Array(SIEVE_LIMIT + 1); // 0=prime, 1=composite
    isComposite[0] = isComposite[1] = 1;
    for (let i = 2; i * i <= SIEVE_LIMIT; i++) {
        if (!isComposite[i]) {
            for (let j = i * i; j <= SIEVE_LIMIT; j += i) isComposite[j] = 1;
        }
    }

    const nextPrime = (v: number): number => {
        while (isComposite[v]) v++;
        return v;
    };

    const nextNonPrime = (v: number): number => {
        while (!isComposite[v]) v++;
        return v;
    };

    let totalOps = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i % 2 === 0) totalOps += nextPrime(nums[i])    - nums[i];
        else             totalOps += nextNonPrime(nums[i])  - nums[i];
    }

    return totalOps;
};