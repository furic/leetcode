function stoneGameIII(stoneValue: number[]): string {
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let total = 0;

    for (let i = stoneValue.length - 1; i >= 0; i--) {
        total += stoneValue[i];

        const current = total - Math.min(s1, s2, s3);

        s3 = s2;
        s2 = s1;
        s1 = current;
    }

    const bob = total - s1;

    if (s1 > bob) {
        return "Alice";
    }

    if (s1 < bob) {
        return "Bob";
    }

    return "Tie";
}