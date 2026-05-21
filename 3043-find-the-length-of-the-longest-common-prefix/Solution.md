# Prefix Hash Set Longest Match | 10 Lines | O((m + n) × d) | 73ms

# Intuition
Store all numeric prefixes of every number in `arr1` in a set. Then for each number in `arr2`, strip digits from the right until we find a match in the set — the first match is the longest prefix of that number that also appears in `arr1`.

# Approach
- For each number in `arr1`, generate all prefixes by repeatedly dividing by 10: `num`, `num/10`, `num/100`, ... down to a single digit. Insert all into `arr1Prefixes`.
- For each number in `arr2`, do the same right-stripping. The first value that hits `arr1Prefixes` is the longest common prefix for this number — record its digit length and break.
- Return the maximum length found.

# Complexity
- Time complexity: $$O((m + n) \times d)$$ where $$d \leq 9$$ is the max digit count — for each number, we generate at most `d` prefixes.

- Space complexity: $$O(m \times d)$$ — the prefix set holds at most `m × d` entries.

# Code
```typescript []
const longestCommonPrefix = (arr1: number[], arr2: number[]): number => {
    const arr1Prefixes = new Set<number>();
    for (const num of arr1) {
        for (let x = num; x > 0; x = Math.floor(x / 10))
            arr1Prefixes.add(x);
    }

    let maxLen = 0;

    for (const num of arr2) {
        for (let x = num; x > 0; x = Math.floor(x / 10)) {
            if (arr1Prefixes.has(x)) {
                maxLen = Math.max(maxLen, x.toString().length);
                break;
            }
        }
    }

    return maxLen;
};
```