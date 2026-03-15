const countCommas = (n: number): number => {
    if (n < 1000) return 0;

    let totalCommas = 0;

    for (let commaCount = 1; ; commaCount++) {
        const tierStart = 10 ** (3 * commaCount);         // first number with commaCount commas
        const tierEnd   = 10 ** (3 * (commaCount + 1)) - 1; // last number with commaCount commas

        if (tierStart > n) break;

        const numbersInTier = Math.min(n, tierEnd) - tierStart + 1;
        totalCommas += commaCount * numbersInTier;
    }

    return totalCommas;
};