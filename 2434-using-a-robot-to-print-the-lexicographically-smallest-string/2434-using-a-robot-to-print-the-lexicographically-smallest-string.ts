const robotWithString = (s: string): string => {
  const freq = new Array(26).fill(0);

  // Count frequency of each character
  for (const ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  const result: string[] = [];
  const stack: string[] = [];

  for (const ch of s) {
    stack.push(ch);
    freq[ch.charCodeAt(0) - 97]--;

    // Find the smallest remaining character
    while (
      stack.length > 0 &&
      stack[stack.length - 1].charCodeAt(0) <= smallestChar(freq)
    ) {
      result.push(stack.pop()!);
    }
  }

  // Pop remaining characters from stack
  while (stack.length > 0) {
    result.push(stack.pop()!);
  }

  return result.join('');
};

// Helper to get char code of the smallest remaining character
const smallestChar = (freq: number[]): number => {
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0) return 97 + i;
  }
  return 97; // fallback value, shouldn't be used
};