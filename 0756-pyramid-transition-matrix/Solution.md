# DFS with Memoization | 52 Lines | O(n² × b^n) | 54ms

# Intuition

Building a pyramid row-by-row is a recursive problem: for each row, we try all valid combinations of blocks for the next row. Since we might encounter the same row configuration multiple times through different paths, memoization prevents redundant computation.

# Approach

**Preprocessing:**
- Build a map: `"AB" → ["C", "D", ...]` to quickly look up valid top blocks for any pair
- This converts the allowed patterns into an efficient lookup structure

**Core Strategy:**
- Use DFS to build the pyramid layer by layer from bottom to top
- For each row, try all valid combinations of blocks for the next row
- Memoize results for each row configuration to avoid recomputation
- Base case: single block means pyramid is complete

**Building Next Row:**
- For current row of length n, next row has length n-1
- For each adjacent pair in current row, choose a valid top block
- Recursively try all combinations using backtracking
- If any combination leads to a complete pyramid, return true

**Example (bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]):**

Map: `"BC"→["C"], "CD"→["E"], "CE"→["A"]`

Start with "BCD":
- Pair "BC" → top "C"
- Pair "CD" → top "E"
- Next row: "CE"

From "CE":
- Pair "CE" → top "A"
- Next row: "A"

Single block "A" → pyramid complete ✓

**Why Memoization Matters:**

For "AAAA" with certain patterns, the row "AA" might be reached through multiple different paths from "AAAA". Without memoization, we'd redundantly check if "AA" can complete the pyramid every time.

# Complexity

- Time complexity: $$O(n^2 \times b^n)$$
  - n = length of bottom row
  - b = average branching factor (valid top blocks per pair)
  - Number of unique rows: O(n²) different configurations
  - Per row: try b^(n-1) combinations for next row
  - With memoization: each unique row computed once
  - Overall: O(n² × b^n) in worst case

- Space complexity: $$O(n^2)$$
  - Memoization cache: O(n²) unique row configurations
  - Recursion depth: O(n) for pyramid height
  - Transition map: O(k) where k = number of allowed patterns
  - Overall: O(n²) dominated by cache

# Code
```typescript []
const pyramidTransition = (bottom: string, allowed: string[]): boolean => {
    const allowedTransitions = new Map<string, string[]>();
    
    for (const pattern of allowed) {
        const bottomPair = pattern.slice(0, 2);
        if (!allowedTransitions.has(bottomPair)) {
            allowedTransitions.set(bottomPair, []);
        }
        allowedTransitions.get(bottomPair)!.push(pattern[2]);
    }

    const canBuildCache = new Map<string, boolean>();

    const canBuildPyramid = (currentRow: string): boolean => {
        if (canBuildCache.has(currentRow)) {
            return canBuildCache.get(currentRow)!;
        }

        if (currentRow.length === 1) {
            canBuildCache.set(currentRow, true);
            return true;
        }

        const rowLength = currentRow.length;

        for (let blockIndex = 0; blockIndex < rowLength - 1; blockIndex++) {
            const pair = currentRow.slice(blockIndex, blockIndex + 2);
            if (!allowedTransitions.has(pair)) {
                canBuildCache.set(currentRow, false);
                return false;
            }
        }

        const buildNextRow = (pairIndex: number, nextRow: string): boolean => {
            if (pairIndex === rowLength - 1) {
                return canBuildPyramid(nextRow);
            }

            const bottomPair = currentRow.slice(pairIndex, pairIndex + 2);
            const possibleTopBlocks = allowedTransitions.get(bottomPair)!;
            
            for (const topBlock of possibleTopBlocks) {
                if (buildNextRow(pairIndex + 1, nextRow + topBlock)) {
                    return true;
                }
            }
            
            return false;
        };

        const canBuild = buildNextRow(0, "");
        canBuildCache.set(currentRow, canBuild);
        return canBuild;
    };

    return canBuildPyramid(bottom);
};
```