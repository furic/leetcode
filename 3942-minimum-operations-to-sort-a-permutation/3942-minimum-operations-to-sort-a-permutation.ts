const minOperations = (nums: number[]): number => {
    const n = nums.length;
    if (n <= 1) return 0;

    let minOps = Infinity;

    // Case A: nums is sorted [0..n-1] rotated left by `shift`, where shift = nums[0].
    // Undo it with (n - shift) left rotations, or reverse, rotate, reverse for (shift + 2).
    let isRotatedSorted = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== (nums[0] + i) % n) { isRotatedSorted = false; break; }
    }
    if (isRotatedSorted) {
        const shift = nums[0];
        minOps = shift === 0 ? 0 : Math.min(n - shift, shift + 2);
    }

    // Case B: nums is reversed-sorted [n-1..0] rotated left by `shift`, where nums[0] = n - 1 - shift.
    // One reverse plus the cheaper rotation direction.
    let isRotatedReversed = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== ((nums[0] - i) % n + n) % n) { isRotatedReversed = false; break; }
    }
    if (isRotatedReversed) {
        const shift = n - 1 - nums[0];
        minOps = Math.min(minOps, Math.min(shift, n - shift) + 1);
    }

    return minOps === Infinity ? -1 : minOps;
};