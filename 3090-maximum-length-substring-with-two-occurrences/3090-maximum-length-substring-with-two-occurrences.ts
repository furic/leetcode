function maximumLengthSubstring(s: string): number {
    const count: number[] = new Array(26).fill(0);
    let left = 0;
    let ans = 0;

    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 97;
        count[idx]++;

        while (count[idx] > 2) {
            count[s.charCodeAt(left) - 97]--;
            left++;
        }

        ans = Math.max(ans, right - left + 1);
    }

    return ans;
};