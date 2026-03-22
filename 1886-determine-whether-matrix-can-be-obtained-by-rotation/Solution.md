# In-Place 4-Cycle Rotation Check | 22 Lines | O(n²) | 0ms

# Intuition
There are only 4 distinct rotations (0°, 90°, 180°, 270°). Check each one against the target and return true immediately on a match. Rotating in-place avoids allocating a new matrix each time.

# Approach
- **`matchesTarget`:** Compare all `n²` cells between `mat` and `target`. Returns early on first mismatch.
- **`rotate90` (clockwise, in-place):** Uses the standard 4-cell cycle rotation on the outer-to-inner rings:
  - Iterate over `r` in `[0, half)` and `c` in `[0, halfCeil)` where `half = floor(n/2)` and `halfCeil = ceil(n/2)`.
  - The four cells in each 90° cycle are `(r,c)`, `(c, n-1-r)`, `(n-1-r, n-1-c)`, `(n-1-c, r)` — rotate them together using a single `tmp` variable.
  - `halfCeil` (ceiling) is used for `c` to handle odd-sized matrices where the center row needs to be covered.
- **Main loop:** Try each of the 4 rotations. Check before rotating so 0° is covered, then rotate and check up to 3 more times. If none matches, return `false`.
- After 4 rotations, `mat` is back to its original state — no need to restore.

# Complexity
- Time complexity: $$O(n^2)$$ — up to 4 rotations and comparisons, each O(n²).

- Space complexity: $$O(1)$$ — rotation and comparison are in-place with only scalar temporaries.

# Code
```typescript []
const findRotation = (mat: number[][], target: number[][]): boolean => {
    const n = mat.length;
    const half = Math.floor(n / 2);
    const halfCeil = Math.floor((n + 1) / 2);

    const matchesTarget = (): boolean => {
        for (let r = 0; r < n; r++)
            for (let c = 0; c < n; c++)
                if (mat[r][c] !== target[r][c]) return false;
        return true;
    };

    const rotate90 = (): void => {
        for (let r = 0; r < half; r++) {
            for (let c = 0; c < halfCeil; c++) {
                const tmp                  = mat[r][c];
                mat[r][c]                  = mat[n - 1 - c][r];
                mat[n - 1 - c][r]          = mat[n - 1 - r][n - 1 - c];
                mat[n - 1 - r][n - 1 - c]  = mat[c][n - 1 - r];
                mat[c][n - 1 - r]          = tmp;
            }
        }
    };

    for (let rotation = 0; rotation < 4; rotation++) {
        if (matchesTarget()) return true;
        rotate90();
    }

    return false;
};
```