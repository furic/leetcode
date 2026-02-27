const minOperations = (s: string, k: number): number => {
    const n = s.length;
    const zeroCount = s.split('').filter(ch => ch === '0').length;
    const oneCount = n - zeroCount;

    // Edge case: window size equals string length, only one window to consider
    if (n === k) {
        if (zeroCount === 0) return 0;
        if (zeroCount === n) return 1;
        return -1;
    }

    // Ceiling division: minimum operations needed to cover x items with groups of y
    const ceilDiv = (x: number, y: number): number => Math.floor((x + y - 1) / y);

    let minOps = Infinity;

    // Strategy A: each operation flips (k zeros + some ones) and ((n-k) zeros + some ones)
    // Requires even number of zeros so they cancel out in pairs across operations
    if (zeroCount % 2 === 0) {
        let opsNeeded = Math.max(ceilDiv(zeroCount, k), ceilDiv(zeroCount, n - k));
        if (opsNeeded % 2 === 1) opsNeeded++; // must be even to restore flipped ones
        minOps = Math.min(minOps, opsNeeded);
    }

    // Strategy B: each operation flips (k zeros) in one window and (n-k ones) in the other
    // Parity of zeros must match parity of k for this to be achievable
    if (zeroCount % 2 === k % 2) {
        let opsNeeded = Math.max(ceilDiv(zeroCount, k), ceilDiv(oneCount, n - k));
        if (opsNeeded % 2 === 0) opsNeeded++; // must be odd to net-flip all zeros
        minOps = Math.min(minOps, opsNeeded);
    }

    return minOps < Infinity ? minOps : -1;
};