const maxDistance = (s: string, k: number): number => {
    const dir: Record<string, [number, number]> = {
        N: [0, 1],
        S: [0, -1],
        E: [1, 0],
        W: [-1, 0],
    };

    let x = 0, y = 0, max = 0;
    for (let i = 0; i < s.length; i++) {
        const [dx, dy] = dir[s[i]];
        x += dx;
        y += dy;
        const dist = Math.abs(x) + Math.abs(y);
        max = Math.max(max, Math.min(dist + 2 * k, i + 1));
    }
    return max;
};