const maxOperations = (s: string): number => {
    const pref: number[] = [];
    for (const c of s) 
        pref.push((pref.at(-1) ?? 0) + +c);

    const seen = new Set<number>();
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0')
            seen.add(pref[i]);
    }

    return [...seen].reduce((a, c) => a + c, 0);
};
