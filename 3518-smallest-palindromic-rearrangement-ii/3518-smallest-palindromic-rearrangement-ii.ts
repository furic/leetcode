const smallestPalindrome = (s: string, k: number): string => {
    const n = s.length;
    const halfLength = Math.floor(n / 2);
    const halfCounts = new Array<number>(26).fill(0);

    // Count each character in the first half and double it (since it's mirrored)
	for (let i = 0; i < halfLength; i++) {
        halfCounts[s[i].charCodeAt(0) - 97]++;
    }

    // Determine middle character (if any)
    const midChar = n % 2 === 1 ? s[halfLength] : '';

    // Compute nCk with early cutoff
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

    // Count how many permutations can be formed with current character counts
    const countPerms = (counts: number[], remaining: number, max: number): number => {
        let res = 1;
        for (const count of counts) {
            const ways = comb(remaining, count, max);
            res *= ways;
            if (res >= k + 1) return k + 1;
            remaining -= count;
        }
        return res;
    };

    const totalPerms = countPerms([...halfCounts], halfLength, k + 1);
    if (k > totalPerms) return '';

    // Build the k-th lexicographic half
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

    // Construct final palindrome
    const secondHalf = [...half].reverse().join('');
    return half.join('') + midChar + secondHalf;
}