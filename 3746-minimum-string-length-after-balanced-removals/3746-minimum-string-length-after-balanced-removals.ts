const minLengthAfterRemovals = (s: string): number => {
    let balance = 0;
    for (const char of s) {
        balance += char === 'a' ? 1 : -1;
    }
    return Math.abs(balance);
};