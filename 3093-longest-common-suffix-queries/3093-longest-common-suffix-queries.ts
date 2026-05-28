interface TrieNode {
    children: Record<string, TrieNode>;
    best: number;
    len: number;
}

function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
    const root: TrieNode = { children: {}, best: -1, len: Infinity };
    
    let minLenIdx = 0;
    wordsContainer.forEach((word, idx) => {
        if (word.length < wordsContainer[minLenIdx].length) 
            minLenIdx = idx;
        
        let curr = root;
        for (let i = word.length - 1; i >= 0; i--) {
            const char = word[i];
            if (!curr.children[char]) 
                curr.children[char] = { children: {}, best: idx, len: word.length };
            curr = curr.children[char];
            if (word.length < curr.len) { 
                curr.best = idx; curr.len = word.length; 
            }
        }
    });

    return wordsQuery.map(word => {
        let curr = root, lastBest = -1;
        for (let i = word.length - 1; i >= 0; i--) {
            if (!curr.children[word[i]]) 
                break;
            curr = curr.children[word[i]];
            lastBest = curr.best;
        }
        return lastBest === -1 ? minLenIdx : lastBest;
    });
}