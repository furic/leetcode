function groupAnagrams(strs: string[]): string[][] {
    const anagramMap = strs.reduce((acc, word) => {
        const sorted = word.split('').sort().join('');
        if (acc.has(sorted)) {
            let value = acc.get(sorted);
            value.push(word);
        } else {
            acc.set(sorted, [word]);
        }
        return acc;
    }, new Map() as Map<string, string[]>)

    return Array.from(anagramMap.values());
};