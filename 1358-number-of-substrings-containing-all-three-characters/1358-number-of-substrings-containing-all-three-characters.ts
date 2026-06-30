function numberOfSubstrings(s: string): number {
    const freq: number[] = [0, 0, 0];

    let left = 0, res = 0;
    const n = s.length;

    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - 97]++;

        while (freq[0] > 0 && freq[1] > 0 && freq[2] > 0) {
            res += n - i;
            freq[s.charCodeAt(left) - 97]--;
            left++;
        }
    }

    return res;
}