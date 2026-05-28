# Suffix Trie Best Index Propagation | 24 Lines | O(Σ|words|) | 823ms

# Intuition
Suffix matching is equivalent to prefix matching on reversed strings. We build a trie of reversed container words, storing at each node the best candidate (shortest word, earliest index as tiebreaker). Each query then traverses the trie as far as possible and returns the best candidate at the deepest node reached.

# Approach
- **Build the trie (reversed insertion):** For each container word, insert it character by character from the last character to the first. At each node, update `bestIdx` and `bestLen` if the current word is shorter (or same length and earlier index — naturally handled by insertion order since we only update on strict improvement).
- **Root node fallback:** The root holds the globally shortest container word (`shortestIdx`), used when a query shares no suffix with any container word.
- **Query:** For each query word, traverse the trie from the last character forward. At each step, if the next character has no child, stop. Otherwise advance and record the current node's `bestIdx`. Return the last recorded `bestIdx`, or `shortestIdx` if no traversal was made.
- Each trie node stores `bestIdx` (index of the best container word ending through this suffix) and `bestLen` (its length) — updated greedily as words are inserted.

# Complexity
- Time complexity: $$O(\Sigma|wordsContainer| + \Sigma|wordsQuery|)$$ — each character of every word is processed once for insertion and once for query.

- Space complexity: $$O(\Sigma|wordsContainer|)$$ — trie node count bounded by total characters in container.

# Code
```typescript []
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
```