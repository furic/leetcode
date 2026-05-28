interface TrieNode {
    children: Record<string, TrieNode>;
    bestIdx: number;
    bestLen: number;
}

const makeNode = (idx: number, len: number): TrieNode =>
    ({ children: {}, bestIdx: idx, bestLen: len });

const stringIndices = (wordsContainer: string[], wordsQuery: string[]): number[] => {
    const root: TrieNode = makeNode(-1, Infinity);

    let shortestIdx = 0;
    wordsContainer.forEach((word, idx) => {
        if (word.length < wordsContainer[shortestIdx].length) shortestIdx = idx;

        let node = root;
        for (let i = word.length - 1; i >= 0; i--) {
            const ch = word[i];
            if (!node.children[ch]) node.children[ch] = makeNode(idx, word.length);
            node = node.children[ch];
            if (word.length < node.bestLen) {
                node.bestIdx = idx;
                node.bestLen = word.length;
            }
        }
    });

    return wordsQuery.map(word => {
        let node = root;
        let lastBestIdx = -1;
        for (let i = word.length - 1; i >= 0; i--) {
            if (!node.children[word[i]]) break;
            node = node.children[word[i]];
            lastBestIdx = node.bestIdx;
        }
        return lastBestIdx === -1 ? shortestIdx : lastBestIdx;
    });
};