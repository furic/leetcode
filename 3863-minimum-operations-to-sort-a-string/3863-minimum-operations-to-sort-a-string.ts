const minOperations = (s: string): number => {
    const n = s.length;

    // Already sorted: no operations needed
    let alreadySorted = true;
    for (let i = 1; i < n; i++) {
        if (s[i] < s[i - 1]) { alreadySorted = false; break; }
    }
    if (alreadySorted) return 0;

    // Unsorted pair can't be fixed: sorting the whole string isn't allowed
    if (n === 2) return -1;

    let minChar = s[0], maxChar = s[0];
    for (let i = 1; i < n; i++) {
        if (s[i] < minChar) minChar = s[i];
        if (s[i] > maxChar) maxChar = s[i];
    }

    // Sort a prefix/suffix that excludes the entire string: the min is already
    // at the front, or the max is already at the back
    if (s[0] === minChar || s[n - 1] === maxChar) return 1;

    // A min or max in the interior can be moved into place with two sorts
    for (let i = 1; i < n - 1; i++) {
        if (s[i] === minChar || s[i] === maxChar) return 2;
    }

    // Min only at the end and max only at the front: needs three sorts
    return 3;
};