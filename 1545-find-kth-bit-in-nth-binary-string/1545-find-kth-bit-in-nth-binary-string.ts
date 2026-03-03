const findKthBit = (n: number, k: number): string => {
    if (n === 1) return '0';

    const mid = 1 << (n - 1); // 2^(n-1) — the center position of Sn

    if (k === mid) return '1';

    if (k < mid) return findKthBit(n - 1, k); // first half mirrors Sn-1 directly

    // Second half: mirror position around center, then invert
    const mirroredPosition = 2 * mid - k;
    return findKthBit(n - 1, mirroredPosition) === '0' ? '1' : '0';
};