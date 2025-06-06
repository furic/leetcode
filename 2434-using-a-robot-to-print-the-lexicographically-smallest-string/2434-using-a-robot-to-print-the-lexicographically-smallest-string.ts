function robotWithString(s: string): string {
    const freq = new Array(26).fill(0);
    for (const char of s) {
        freq[char.charCodeAt(0) - 97]++;
    }

    const stack: string[] = [];
    const result: string[] = [];
    let smallest = 0; // index of the current smallest character available

    for (const char of s) {
        const idx = char.charCodeAt(0) - 97;
        stack.push(char);
        freq[idx]--;

        // Advance smallest to the next available character
        while (smallest < 26 && freq[smallest] === 0) {
            smallest++;
        }

        // Pop from stack to result if it's <= current smallest available character
        while (
            stack.length > 0 &&
            stack[stack.length - 1].charCodeAt(0) - 97 <= smallest
        ) {
            result.push(stack.pop()!);
        }
    }

    return result.join('');
}