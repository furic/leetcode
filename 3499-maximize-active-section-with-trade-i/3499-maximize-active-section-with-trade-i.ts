function maxActiveSectionsAfterTrade(s: string): number {
    let ones = 0;

    for (const c of s) {
        if (c === "1") {
            ones++;
        }
    }

    const paddedS = "1" + s + "1";
    const zeroRuns: number[] = [];

    let length = 0;

    for (const c of paddedS) {
        if (c === "0") {
            length++;
        } else if (length > 0) {
            zeroRuns.push(length);
            length = 0;
        }
    }

    if (zeroRuns.length < 2) {
        return ones;
    }

    let best = 0;

    for (let i = 0; i + 1 < zeroRuns.length; i++) {
        best = Math.max(
            best,
            zeroRuns[i] + zeroRuns[i + 1]
        );
    }

    return ones + best;
}