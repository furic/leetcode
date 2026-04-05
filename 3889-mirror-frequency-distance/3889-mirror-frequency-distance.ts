const mirrorFrequency = (s: string): number => {
    const freq = new Uint32Array(123);
    for (let i = 0; i < s.length; i++) freq[s.charCodeAt(i)]++;

    let total = 0;

    // Digits '0'(48) to '4'(52): mirror of code i is '0'+'9'-i = 105-i
    for (let i = 48; i <= 52; i++)
        total += Math.abs(freq[i] - freq[105 - i]);

    // Letters 'a'(97) to 'm'(109): mirror of code i is 'a'+'z'-i = 219-i
    for (let i = 97; i <= 109; i++)
        total += Math.abs(freq[i] - freq[219 - i]);

    return total;
};