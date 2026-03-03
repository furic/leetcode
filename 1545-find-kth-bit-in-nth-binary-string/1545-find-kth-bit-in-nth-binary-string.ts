function findKthBit(n: number, k: number): string {
    if (n === 1) return '0';

    const mid = 1 << (n - 1); // Equivalent to 2^(n - 1)

    if (k === mid) {
        return '1';
    } else if (k < mid) {
        // The kth bit is in the first half, same as in Sn-1
        return findKthBit(n - 1, k);
    } else {
        // The kth bit is in the second half
        // Find the mirrored position in Sn-1
        const mirroredK = 2 * mid - k;
        const bit = findKthBit(n - 1, mirroredK);
        // Invert the bit
        return bit === '0' ? '1' : '0';
    }
}