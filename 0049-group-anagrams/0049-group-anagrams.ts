function groupAnagrams(strs: string[]): string[][] {
    const anagramsMap = new Map<string, string[]>();
    strs.forEach((str) => {
        const key = str.split('').sort().join();
        anagramsMap.set(key, [...(anagramsMap.get(key) || []), str]);
    });
    return [...anagramsMap.values()];
};