const numberOfSpecialChars = (word: string): number =>
    new Set([...word].filter(c => word.includes(c.toUpperCase()) && word.includes(c.toLowerCase()))).size / 2;