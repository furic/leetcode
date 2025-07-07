const concatHex36 = (n: number): string =>
    (n ** 2).toString(16).toUpperCase() + (n ** 3).toString(36).toUpperCase();