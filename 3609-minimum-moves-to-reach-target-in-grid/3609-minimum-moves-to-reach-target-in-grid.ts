/**
 * Calculates the minimum number of moves to get from (sx, sy) to (tx, ty).
 *
 * @param sx The starting x-coordinate.
 * @param sy The starting y-coordinate.
 * @param tx The target x-coordinate.
 * @param ty The target y-coordinate.
 * @returns The minimum number of moves, or -1 if impossible.
 */
function minMoves(sx: number, sy: number, tx: number, ty: number): number {
    // Use BigInt for all calculations to prevent overflow.
    let cx = BigInt(tx);
    let cy = BigInt(ty);
    const bsx = BigInt(sx);
    const bsy = BigInt(sy);

    let moves = 0n;

    // Work backwards from the target to the start, as long as we are "ahead" of the start.
    while (cx > bsx || cy > bsy) {
        // If we've already overshot the start in either coordinate, it's impossible.
        if (cx < bsx || cy < bsy) {
            return -1;
        }

        if (cy > cx) {
            if (cx === 0n) {
                // Forward move: (0, y) -> (0, 2y). Reverse: (0, cy) -> (0, cy/2).
                if (cy % 2n !== 0n) return -1; // Must be even.
                cy /= 2n;
            } else if (cy >= 2n * cx) {
                // Predecessor's y was cy/2.
                if (cy % 2n !== 0n) return -1; // Must be even.
                cy /= 2n;
            } else {
                // Predecessor's y was cy-cx.
                cy -= cx;
            }
            moves++;
        } else if (cx > cy) {
            // Symmetric logic for cx > cy.
            if (cy === 0n) {
                // Forward move: (x, 0) -> (2x, 0). Reverse: (cx, 0) -> (cx/2, 0).
                if (cx % 2n !== 0n) return -1;
                cx /= 2n;
            } else if (cx >= 2n * cy) {
                if (cx % 2n !== 0n) return -1;
                cx /= 2n;
            } else {
                cx -= cy;
            }
            moves++;
        } else { // cx === cy
            const c = cx;
            // Predecessors are (c, 0) and (0, c). Choose the one that doesn't overshoot the target.
            const path_via_c0_possible = (c >= bsx && bsy === 0n);
            const path_via_0c_possible = (c >= bsy && bsx === 0n);

            if (path_via_0c_possible) {
                moves++;
                cx = 0n; // Set current state to the predecessor (0, c)
            } else if (path_via_c0_possible) {
                moves++;
                cy = 0n; // Set current state to the predecessor (c, 0)
            } else {
                return -1; // Neither predecessor can lead to the target.
            }
        }
    }

    // THE FIX: After the loop, verify we landed exactly on the start point.
    if (cx === bsx && cy === bsy) {
        return Number(moves);
    } else {
        // We overshot the target.
        return -1;
    }
}