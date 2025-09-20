# [TypeScript] BFS + Greedy Lexical Build | 52 Lines | O(Σ * n) | 381ms

# Intuition
We need to find the **longest subsequence** that, when repeated `k` times, is still a subsequence of `s`. Since longer valid subsequences are better, and ties are broken by **lexicographically larger**, we can systematically **build candidate subsequences** and check if repeating them `k` times fits inside `s`.

# Approach
- Count frequencies to **filter usable characters** (appearing at least `k` times).
- Sort usable characters in **reverse lexicographical order** for tie-breaking.
- Use **BFS** to build possible subsequences:
  - Start with single usable characters.
  - Extend current subsequences by appending usable characters.
  - For each extension, check if repeating it `k` times is a subsequence of `s` using a **greedy pointer scan**.
  - Update the best candidate if a longer (or lex larger) valid subsequence is found.

# Complexity
- Time complexity: $$O(\Sigma \times n)$$ where $$\Sigma$$ is the number of generated candidates (practically small due to filtering), and \(n\) is the length of `s` for each check.
- Space complexity: $$O(\Sigma)$$ for the BFS queue and subsequences.

# Code
```typescript []
const longestSubsequenceRepeatedK = (s: string, k: number): string => {
    const charFreq: Record<string, number> = {};
    for (const char of s) {
        charFreq[char] = (charFreq[char] || 0) + 1;
    }
    const usableChars = Object.keys(charFreq)
        .filter(char => charFreq[char] >= k)
        .sort()
        .reverse();
    const queue: string[] = [...usableChars];
    let bestSubsequence = "";
    while (queue.length > 0) {
        const currentSubseq = queue.shift()!;
        if (
            currentSubseq.length > bestSubsequence.length ||
            (currentSubseq.length === bestSubsequence.length &&
                currentSubseq > bestSubsequence)
        ) {
            bestSubsequence = currentSubseq;
        }
        for (const char of usableChars) {
            const nextSubseq = currentSubseq + char;
            if (isKRepeatedInString(s, nextSubseq, k)) {
                queue.push(nextSubseq);
            }
        }
    }
    return bestSubsequence;
};
const isKRepeatedInString = (s: string, pattern: string, k: number): boolean => {
    let patternIndex = 0;
    let repeatedCount = 0;
    for (const char of s) {
        if (char === pattern[patternIndex]) {
            patternIndex++;
            if (patternIndex === pattern.length) {
                patternIndex = 0;
                repeatedCount++;
                if (repeatedCount === k) {
                    return true;
                }
            }
        }
    }
    return false;
};
```