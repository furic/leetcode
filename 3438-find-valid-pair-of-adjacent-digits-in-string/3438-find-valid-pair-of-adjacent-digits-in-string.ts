const findValidPair = (s: string): string => {
    // Count the frequency of each digit in the string
    const freq: { [key: string]: number } = {};
    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }

    // Iterate through the string to find the first valid pair
    for (let i = 0; i < s.length - 1; i++) {
        const first = s[i];
        const second = s[i + 1];

        if (
            first !== second &&
            freq[first] === Number(first) &&
            freq[second] === Number(second)
        ) {
            return first + second;
        }
    }

    // If no valid pair is found, return an empty string
    return "";
}