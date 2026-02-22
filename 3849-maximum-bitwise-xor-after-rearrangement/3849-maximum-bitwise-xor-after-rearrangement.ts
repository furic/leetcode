const maximumXor = (s: string, t: string): string => {
    // Count available bits in t to assign optimally
    let availableOnes = t.split('').filter(bit => bit === '1').length;
    let availableZeros = t.length - availableOnes;

    return s.split('').map(sBit => {
        // XOR produces 1 when bits differ, so pair each s-bit with its opposite
        const wantOne = sBit === '0' ? availableOnes > 0 : availableZeros > 0;

        if (wantOne) {
            sBit === '0' ? availableOnes-- : availableZeros--;
            return '1';
        } else {
            sBit === '0' ? availableZeros-- : availableOnes--;
            return '0';
        }
    }).join('');
};