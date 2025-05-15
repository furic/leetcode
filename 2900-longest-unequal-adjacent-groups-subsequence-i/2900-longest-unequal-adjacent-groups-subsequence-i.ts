const getLongestSubsequence = (words: string[], groups: number[]): string[] => {
    let result: string[] = [];
    let lastGroup = -1;
    for (let i = 0; i < words.length; i++) {
        if (lastGroup === groups[i]) continue;
        result.push(words[i]);
        lastGroup = groups[i];
    }
    return result;
};