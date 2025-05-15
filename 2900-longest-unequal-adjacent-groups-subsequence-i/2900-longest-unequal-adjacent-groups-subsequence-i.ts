const getLongestSubsequence = (words: string[], groups: number[]): string[] => {
    const result: string[] = [words[0]];
    let lastGroup = groups[0];
    for (let i = 1; i < words.length; i++) {
        if (lastGroup === groups[i]) continue;
        result.push(words[i]);
        lastGroup = groups[i];
    }
    return result;
};