const maximumXor = (s: string, t: string): string => {
    const tBitCounts = [0, 0];
    for (const bit of t) {
        tBitCounts[Number(bit)]++;
    }

    // To maximise XOR, greedily pair each s-bit with its opposite from t.
    // Falling back to the same bit only when the preferred one is exhausted.
    const xorResult = s.split('').map((sBit) => {
        const preferredTBit = sBit === '1' ? 0 : 1; // opposite bit gives XOR = 1
        const fallbackTBit  = sBit === '1' ? 1 : 0; // same bit gives XOR = 0

        if (tBitCounts[preferredTBit] > 0) {
            tBitCounts[preferredTBit]--;
            return '1';
        } else {
            tBitCounts[fallbackTBit]--;
            return '0';
        }
    });

    return xorResult.join('');
};