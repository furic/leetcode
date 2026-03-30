const canBeEqual = (s1: string, s2: string): boolean =>
    [[0, 2], [1, 3]].every(([a, b]) => [s1[a], s1[b]].sort().join('') === [s2[a], s2[b]].sort().join(''));