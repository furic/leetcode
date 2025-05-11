const minDeletion = (s: string, k: number): number => {
    const counts = new Array(26).fill(0);
    s.split("").map((c) => counts[c.charCodeAt(0) - 'a'.charCodeAt(0)]++);
    const countsDesc = counts.sort((a, b) => b - a).filter((c) => c !== 0);
    if (k >= countsDesc.length) return 0;
    const takes = countsDesc.slice(k);
    return takes.reduce((a, b) => a + b, 0);
};