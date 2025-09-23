# Two Pointer String Parsing | 20 Lines | O(n+m) | 0ms

# Intuition
Version strings need to be compared revision by revision from left to right, treating missing revisions as 0 and ignoring leading zeros. Instead of splitting strings (which uses extra space), we can parse revisions on-the-fly using two pointers, one for each version string. This allows us to compare revisions directly without storing them all.

# Approach
I'll use a two-pointer technique with inline parsing:

1. **Two Pointer Traversal**: Maintain separate pointers for each version string, advancing through both simultaneously.

2. **Extract Revisions**: For each pointer, parse the current revision number by:
   - Reading digits until hitting a dot or end of string
   - Converting to integer (automatically ignoring leading zeros)
   - Advancing past the dot separator

3. **Compare Revisions**: After extracting both revisions at the current position, compare them:
   - If different, return immediately (1 or -1)
   - If same, continue to next revision

4. **Handle Missing Revisions**: When one string ends before the other, treat missing revisions as 0 by continuing to parse the longer string.

5. **Termination**: If all revisions are equal after processing both strings completely, return 0.

This approach avoids string splitting and array allocation, processing revisions in a single pass.

# Complexity
- Time complexity: $$O(n + m)$$
  - Each character in version1 is visited once: O(n)
  - Each character in version2 is visited once: O(m)
  - Total: O(n + m) where n and m are the string lengths

- Space complexity: $$O(1)$$
  - Only using constant extra variables (pointers, revision numbers)
  - No arrays or data structures that scale with input
  - All parsing done in-place

# Code
```typescript []
const compareVersion = (version1: string, version2: string): number => {
    let position1 = 0, position2 = 0;
    const totalLength1 = version1.length;
    const totalLength2 = version2.length;

    while (position1 < totalLength1 || position2 < totalLength2) {
        let revision1 = 0;
        while (position1 < totalLength1 && version1[position1] !== '.') {
            revision1 = revision1 * 10 + Number(version1[position1]);
            position1++;
        }
        position1++;

        let revision2 = 0;
        while (position2 < totalLength2 && version2[position2] !== '.') {
            revision2 = revision2 * 10 + Number(version2[position2]);
            position2++;
        }
        position2++;

        if (revision1 > revision2) return 1;
        if (revision1 < revision2) return -1;
    }
    
    return 0;
};
```