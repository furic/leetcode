# Perimeter Position Linear Encoding | 28 Lines | O(1) per op | 41ms

# Intuition
The robot always walks the perimeter of the grid in a fixed direction. We can linearise the perimeter into a single integer `pos` in `[0, perimeter)` and map it back to `(x, y)` and direction analytically — no simulation of individual steps needed.

# Approach
- **Perimeter layout:** The robot walks the boundary clockwise starting at `(0,0)` facing East:
  - `[0, w-1)` → bottom edge, moving East: `(p, 0)`
  - `[w-1, w+h-2)` → right edge, moving North: `(w-1, p-(w-1))`
  - `[w+h-2, 2w+h-3)` → top edge, moving West: `(w-1-(p-(w+h-2)), h-1)`
  - `[2w+h-3, perimeter)` → left edge, moving South: `(0, perimeter-p)`
- **`step(num)`:** Advance `pos = (pos + num) % perimeter`. Set `hasMoved = true`.
- **`getPos()`:** Map `pos` to `(x, y)` using the four segment formulas above.
- **`getDir()`:** Map `pos` to the direction of the current segment. The only edge case: `pos === 0` is the corner `(0,0)`, which faces `East` initially but `South` after any movement (the robot arrives at `(0,0)` travelling South along the left edge).
- `hasMoved` distinguishes the initial state (`pos=0`, facing East) from arriving back at `(0,0)` after a full lap (`pos=0`, facing South).

# Complexity
- Time complexity: $$O(1)$$ per `step`, `getPos`, and `getDir`.

- Space complexity: $$O(1)$$ — only scalar fields stored.

# Code
```typescript []
class Robot {
    private readonly width: number;
    private readonly height: number;
    private readonly perimeter: number;
    private pos: number;
    private hasMoved: boolean;

    constructor(width: number, height: number) {
        this.width     = width;
        this.height    = height;
        this.perimeter = 2 * (width + height - 2);
        this.pos       = 0;
        this.hasMoved  = false;
    }

    step(num: number): void {
        this.hasMoved = true;
        this.pos = (this.pos + num) % this.perimeter;
    }

    getPos(): number[] {
        const p = this.pos;
        const { width: w, height: h } = this;
        if (p < w)              return [p, 0];
        if (p < w + h - 1)     return [w - 1, p - (w - 1)];
        if (p < 2 * w + h - 2) return [(w - 1) - (p - (w + h - 2)), h - 1];
        return [0, this.perimeter - p];
    }

    getDir(): string {
        const p = this.pos;
        const { width: w, height: h } = this;
        if (p === 0)            return this.hasMoved ? 'South' : 'East';
        if (p < w)              return 'East';
        if (p < w + h - 1)     return 'North';
        if (p < 2 * w + h - 2) return 'West';
        return 'South';
    }
}
```