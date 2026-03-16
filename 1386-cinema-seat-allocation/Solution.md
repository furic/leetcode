# Incremental Bitmask Delta Tracking | 30 Lines | O(r) | 13ms

# Intuition
Every unreserved row fits exactly 2 four-person groups. We start from that upper bound and subtract (or restore) as reserved seats invalidate seating windows. Tracking before/after state per reservation lets us apply only the delta, avoiding a full row rescan each time.

# Approach
- **Three valid windows** for 4-person groups in each row (using 1-indexed seats, ignoring aisle seats 1 and 10):
  - **A** = seats 2–5 (bits 1–4 in 0-indexed bitmask)
  - **B** = seats 4–7 (bits 3–6)
  - **C** = seats 6–9 (bits 5–8)
- Start with `ans = n × 2` — the theoretical maximum if all rows are empty.
- For each `[row, col]` reservation:
  - Skip seats 1 and 10 (aisle seats that can never affect group placement).
  - Record the before-state for windows A, B, C (is each window still fully free?).
  - Set the seat's bit in the row's bitmask.
  - Record the after-state for A, B, C.
  - **Apply the delta:**
    - If window A was free and is now blocked: `ans--`.
    - If window C was free and is now blocked: `ans--`.
    - If A or C was previously free (contributing a group) but both are now blocked, yet B is still free — we can recover one group via B: `ans++`. This handles the case where two separate groups (A and C) collapse into one (B).
    - If neither A nor C was free (so B was carrying the count for this row), and B just became blocked: `ans--`.
- Return `ans`.

# Complexity
- Time complexity: $$O(r)$$ where $$r$$ is the number of reserved seats — each reservation is processed in $$O(1)$$.

- Space complexity: $$O(n)$$ — the `rows` bitmask array, one entry per row that has at least one reservation. In practice much smaller if reservations are sparse.

# Code
```typescript []
function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
    let ans = n * 2;

    const maskA = 0b1111 << 1;
    const maskB = 0b1111 << 3;
    const maskC = 0b1111 << 5;

    const rows = new Array(n);
    reservedSeats.forEach(([r, c]) => {
        if (c === 1 || c === 10) return;

        let row = rows[r - 1] ?? 0;
        const beforeA = (row & maskA) === 0;
        const beforeB = (row & maskB) === 0;
        const beforeC = (row & maskC) === 0;
        row |= (1 << (c - 1));
        const afterA = (row & maskA) === 0;
        const afterB = (row & maskB) === 0;
        const afterC = (row & maskC) === 0;
        rows[r - 1] = row;

        if (beforeA && !afterA) ans--;
        if (beforeC && !afterC) ans--;
        if ((beforeA || beforeC) && !afterA && !afterC && afterB) ans++;
        if (!beforeA && !beforeC && beforeB && !afterB) ans--;
    });

    return ans;
}
```