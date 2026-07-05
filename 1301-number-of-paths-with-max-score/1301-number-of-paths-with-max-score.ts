const pathsWithMaxScore = (board: string[]): number[] => {
    const MOD = 1_000_000_007;
    const n = board.length;

    // score[c] / ways[c]: best score and path count reaching column c in the next row
    let score = new Array(n + 1).fill(-1);
    let ways  = new Array(n + 1).fill(0);

    for (let r = n - 1; r >= 0; r--) {
        const nextScore = new Array(n + 1).fill(-1);
        const nextWays  = new Array(n + 1).fill(0);

        for (let c = n - 1; c >= 0; c--) {
            const ch = board[r][c];
            if (ch === 'X') continue;

            if (ch === 'S') {
                nextScore[c] = 0;
                nextWays[c]  = 1;
                continue;
            }

            // Three predecessors: down (score[c]), right (nextScore[c+1]), diagonal (score[c+1])
            const best = Math.max(score[c], nextScore[c + 1], score[c + 1]);
            if (best === -1) continue;

            let pathCount = 0;
            if (score[c]         === best) pathCount += ways[c];
            if (nextScore[c + 1] === best) pathCount += nextWays[c + 1];
            if (score[c + 1]     === best) pathCount += ways[c + 1];

            const cellVal = ch === 'E' ? 0 : Number(ch);
            nextScore[c] = best + cellVal;
            nextWays[c]  = pathCount % MOD;
        }

        score = nextScore;
        ways  = nextWays;
    }

    return score[0] === -1 ? [0, 0] : [score[0], ways[0]];
};