function minAllOneMultiple(k: number): number {
    // If k is divisible by 2 or 5, no such number exists
    if (k % 2 === 0 || k % 5 === 0) return -1;

    let remainder = 1 % k;
    let length = 1;

    // Use remainder to avoid huge numbers
    while (remainder !== 0) {
        remainder = (remainder * 10 + 1) % k;
        length++;
        // Safety: since k <= 10^5, loop won't exceed k iterations
    }

    return length;
}