const mergeAlternately = (word1: string, word2: string): string => {
    let result = '';
    let current = word1;
    let next = word2;
    while (current.length > 0 && next.length > 0) {
        result += current[0];
        [current, next] = [next, current.slice(1)];
    }
    return result + current + next;
};