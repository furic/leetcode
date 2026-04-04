# Direction-Toggle Step-Count Fill | 14 Lines | O(n²) | 0ms

# Intuition
Spiral filling follows a predictable pattern: move horizontally for `n` steps, then vertically for `n-1`, then horizontally for `n-1`, then vertically for `n-2`, and so on — alternating axis with shrinking segment lengths. We track this with a step counter and axis toggle rather than boundary variables.

# Approach
- Initialise with position just before `(0, 0)`, pointing right (`dir = 1`, `vDir = false`).
- `len` tracks the current segment length, starting at `n`. `steps` counts down within the current segment.
- Fill values `1` to `n²` in order:
  - When `steps === 0`, change direction:
    - If switching from vertical to horizontal (`vDir = true → false`): flip `dir` (e.g. right → left or down → up) and decrement `len` (each full horizontal+vertical cycle shrinks the perimeter by 1).
    - If switching from horizontal to vertical (`vDir = false → true`): just toggle axis, no length change yet.
    - Toggle `vDir`, reset `steps = len`.
  - Advance position along the current axis: `x += dir` (horizontal) or `y += dir` (vertical).
  - Write the current value to `result[y][x]`.
- **Why `dir` flips only on vertical→horizontal:** The spiral turns right→down→left→up→right. The direction reversal (`dir` flip) happens every two turns — specifically when going from vertical back to horizontal (i.e. after up or down completes, we go opposite horizontal). The length shrinks once per two turns as well.

# Complexity
- Time complexity: $$O(n^2)$$ — exactly `n²` fill steps.

- Space complexity: $$O(n^2)$$ — for the output matrix.

# Code
```typescript []
const generateMatrix = (n: number): number[][] => {
    const result = Array.from({ length: n }, () => Array(n));
    let len = n, dir = 1, vDir = false, steps = n, x = -1, y = 0;
    for (let val = 1; val <= n * n; val++) {
        if (steps === 0) {
            if (vDir) dir = -dir;
            else len--;

            vDir = !vDir;
            steps = len;
        }

        if (vDir) y += dir;
        else x += dir;

        result[y][x] = val;
        steps--;
    }

    return result;
};
```