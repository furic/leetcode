function countPrimeSetBits(left: number, right: number): number {
    let count = 0;
    for (let i = left; i <= right; i++) {
        let x = i;
        let bit = 0;
        while (x > 0) {
            x &= x - 1;
            bit++;
        }
        if (bit < 2) continue;
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(bit); j++) {
            if (bit % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) count++;
    }
    return count;
};