const shortestBeautifulSubstring = (s: string, k: number): string => {
    if (s.split('').filter(c => c === '1').length < k) return '';

    let best = s;
    let ones = 0, left = 0;

    for (let right = 0; right < s.length; right++) {
        ones += +s[right];

        // Shrink from left: remove excess 1s or leading 0s
        while (ones > k || s[left] === '0') ones -= +s[left++];

        if (ones === k) {
            const window = s.slice(left, right + 1);
            if (window.length < best.length || (window.length === best.length && window < best))
                best = window;
        }
    }

    return best;
};