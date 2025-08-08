# Sorted Greedy Compare | 15 Lines | O(n log n) | 30ms

# Intuition

Since subfolders share the same prefix as their parent with an added "/", sorting the paths lexicographically ensures parents come before children, allowing us to detect and skip subfolders efficiently.

# Approach

1. Sort `folders` lexicographically.
2. Initialize the first folder as `lastKept` and start building the `filtered` result list.
3. For each subsequent folder, check if it starts with `lastKept + '/'`:
   - If **not**, it is a non-subfolder and should be kept; update `lastKept`.
   - If **yes**, it is a subfolder and should be skipped.
4. Return the filtered result.

# Complexity

- Time complexity: $$O(n \log n)$$ due to the initial sort.
- Space complexity: $$O(n)$$ for the filtered result list.

# Code

```typescript
const removeSubfolders = (folders: string[]): string[] => {
    folders.sort();
    let lastKept = folders[0];
    const filtered: string[] = [lastKept];
    for (let i = 1; i < folders.length; i++) {
        const currentFolder = folders[i];
        if (!currentFolder.startsWith(lastKept + '/')) {
            filtered.push(currentFolder);
            lastKept = currentFolder;
        }
    }
    return filtered;
};
```