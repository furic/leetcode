# In-Place Stack Run-Length Collapse | 14 Lines | O(n) | 8ms

# Intuition
Rather than repeatedly scanning for k-runs (O(n²) worst case), we simulate a stack in-place: as we write each character, we track its current run length. When the run length hits `k`, we immediately erase those `k` characters by rewinding the write pointer — this naturally triggers cascading collapses on the characters that become newly adjacent.

# Approach
- Split `str` into a `chars` array for in-place mutation; maintain a `runLengths` array parallel to it.
- Use a `write` pointer (the stack top) and a `read` pointer scanning left to right:
  - Copy `chars[read]` to `chars[write]`.
  - Compute `runLengths[write]`: if the character matches the one just behind (`chars[write - 1]`), extend the run (`runLengths[write - 1] + 1`); otherwise start a new run at `1`.
  - If `runLengths[write] === k`, collapse the run: rewind `write` by `k` positions, effectively erasing those characters from the "stack".
  - Advance `write`.
- After processing all characters, `chars[0..write)` is the final string.
- **Cascading collapses:** Because the write pointer tracks run lengths from the preceding written characters (not the original string), when a run of `k` is erased and two formerly separated equal characters become adjacent, the next character written will correctly extend *their* run length — enabling further collapses automatically.

# Complexity
- Time complexity: $$O(n)$$ — each character is read once and written at most once.

- Space complexity: $$O(n)$$ — for the `chars` and `runLengths` arrays.

# Code
```typescript []
const removeDuplicates = (str: string, k: number): string => {
    if (str.length < 2) return str;

    const chars = str.split('');
    const runLengths: number[] = [];
    let write = 0;

    for (let read = 0; read < str.length; read++) {
        chars[write] = chars[read];
        runLengths[write] = write > 0 && chars[write - 1] === chars[write]
            ? runLengths[write - 1] + 1
            : 1;

        if (runLengths[write] === k) write -= k;
        write++;
    }

    return chars.slice(0, write).join('');
};
```