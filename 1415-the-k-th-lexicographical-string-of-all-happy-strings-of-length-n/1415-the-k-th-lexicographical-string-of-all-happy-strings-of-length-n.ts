const getHappyString = (n: number, k: number): string => {
    const totalHappyStrings = 3 * (1 << (n - 1)); // 3 choices for first char, 2 for each subsequent
    if (k > totalHappyStrings) return '';

    k--; // Convert to 0-indexed

    let result = '';
    let prevChar = '';

    for (let pos = 0; pos < n; pos++) {
        const subtreeSize = 1 << (n - pos - 1); // Each choice branches into 2^(remaining) strings
        const choices = ['a', 'b', 'c'].filter(ch => ch !== prevChar);
        const choiceIndex = Math.floor(k / subtreeSize);

        prevChar = choices[choiceIndex];
        result += prevChar;
        k %= subtreeSize;
    }

    return result;
};