const numOfStrings = (patterns: string[], word: string): number =>
    patterns.filter(pat => word.includes(pat)).length;