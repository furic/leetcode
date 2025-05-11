const minDeletion = (s: string, k: number): number => {
    const counts: Map<string, number> = new Map();
    s.split("").map((c) => counts.set(c, (counts.get(c) ?? 0) + 1));
    if (k >= counts.size) return 0;
    const sortedCounts = Array.from(counts.values()).sort((a, b) => a - b);
    const takes = sortedCounts.slice(0, counts.size - k);
    return takes.reduce((a, b) => a + b, 0);
};
