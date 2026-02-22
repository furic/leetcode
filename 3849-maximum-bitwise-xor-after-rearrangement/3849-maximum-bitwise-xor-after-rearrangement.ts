const maximumXor = (s: string, t: string): string => {
    let availableOnes = 0;
    let availableZeros = 0;

    for (let i = 0; i < t.length; i++) {
        if (t[i] === '1') availableOnes++;
        else availableZeros++;
    }

    const result = new Array(s.length);

    for (let i = 0; i < s.length; i++) {
        const sBit = s[i];
        // XOR produces 1 when bits differ, so try to pair s-bit with its opposite
        const canProduceOne = sBit === '0' ? availableOnes > 0 : availableZeros > 0;

        if (canProduceOne) {
            sBit === '0' ? availableOnes-- : availableZeros--;
            result[i] = '1';
        } else {
            sBit === '0' ? availableZeros-- : availableOnes--;
            result[i] = '0';
        }
    }

    return result.join('');
};