# Combinatorial K-th Palindrome Half | 30 Lines | O(n × 26) | 53ms

# Intuition
A palindrome is fully determined by its first half (plus an optional middle character). The k-th palindromic permutation is the k-th lexicographic arrangement of those half-characters, mirrored. We build it greedily using combinatorial counting.

# Approach
- Extract character counts for the first `halfLength = floor(n/2)` characters. The middle character (if any) is fixed.
- **Total count check:** `countPerms` computes the number of distinct arrangements of the remaining characters at each step using multinomial coefficients: `n! / (c1! × c2! × ...)` = product of `C(remaining, count_i)` over all characters. If total < k, return `""`.
- **Greedy k-th selection:** For each position in the half, try characters `'a'` to `'z'` in order. For each candidate, compute how many permutations have this character at this position (with one fewer of that character for the remaining positions). If `k > that count`, subtract and move to the next candidate. Otherwise, fix this character and advance.
- `comb(n, k, max)` computes `C(n,k)` with early cutoff at `max` to avoid overflow.
- Mirror the built half to form the full palindrome.

# Complexity
- Time complexity: $$O(n \times 26)$$ — for each of the `halfLength` positions, we try up to 26 characters and recompute `countPerms` in $$O(26)$$.

- Space complexity: $$O(26)$$ — frequency array and half buffer.

# Code
```typescript []
const smallestPalindrome = (s: string, k: number): string => {
    const n = s.length;
    const halfLength = Math.floor(n / 2);
    const halfCounts = new Array<number>(26).fill(0);

    for (let i = 0; i < halfLength; i++)
        halfCounts[s[i].charCodeAt(0) - 97]++;

    const midChar = n % 2 === 1 ? s[halfLength] : '';

    const comb = (n: number, k: number, max: number): number => {
        if (k > n) return 0;
        k = Math.min(k, n - k);
        let res = 1;
        for (let i = 1; i <= k; i++) {
            res = (res * (n - k + i)) / i;
            if (res >= max) return max;
        }
        return res;
    };

    const countPerms = (counts: number[], remaining: number, max: number): number => {
        let res = 1;
        for (const count of counts) {
            res *= comb(remaining, count, max);
            if (res >= max) return max;
            remaining -= count;
        }
        return res;
    };

    if (k > countPerms([...halfCounts], halfLength, k + 1)) return '';

    const half: string[] = [];
    for (let pos = 0; pos < halfLength; pos++) {
        for (let i = 0; i < 26; i++) {
            if (halfCounts[i] === 0) continue;
            halfCounts[i]--;
            const permsWithThisPrefix = countPerms([...halfCounts], halfLength - pos - 1, k + 1);
            if (k > permsWithThisPrefix) {
                k -= permsWithThisPrefix;
                halfCounts[i]++;
            } else {
                half.push(String.fromCharCode(97 + i));
                break;
            }
        }
    }

    return half.join('') + midChar + [...half].reverse().join('');
};
```