const residuePrefixes = (s: string): number => {
    const set = new Set<string>();
    return s.split("").reduce((arr, c, i) => {
        set.add(c);
        return set.size === (i + 1) % 3 ? arr + 1 : arr;
    }, 0);
};