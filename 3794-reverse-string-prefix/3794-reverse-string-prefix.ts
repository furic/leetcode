const reversePrefix = (s: string, k: number): string =>
    s
        .split("")
        .map((c, i) => (i < k ? s[k - i - 1] : c))
        .join("");