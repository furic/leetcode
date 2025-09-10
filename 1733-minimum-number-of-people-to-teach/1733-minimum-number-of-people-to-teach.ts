function minimumTeachings(
    n: number,
    languages: number[][],
    friendships: number[][],
): number {
    const cncon: Set<number> = new Set();
    for (const friendship of friendships) {
        const mp: Set<number> = new Set();
        let conm = false;
        for (const lan of languages[friendship[0] - 1]) {
            mp.add(lan);
        }
        for (const lan of languages[friendship[1] - 1]) {
            if (mp.has(lan)) {
                conm = true;
                break;
            }
        }

        if (!conm) {
            cncon.add(friendship[0] - 1);
            cncon.add(friendship[1] - 1);
        }
    }

    let max_cnt = 0;
    const cnt: number[] = new Array(n + 1).fill(0);
    for (const person of cncon) {
        for (const lan of languages[person]) {
            cnt[lan]++;
            max_cnt = Math.max(max_cnt, cnt[lan]);
        }
    }

    return cncon.size - max_cnt;
}