const earliestAndLatest = (n: number, firstPlayer: number, secondPlayer: number): number[] => {
    let playerA = Math.min(firstPlayer, secondPlayer);
    let playerB = Math.max(firstPlayer, secondPlayer);

    // If they meet in the first round directly
    if (playerA + playerB === n + 1) return [1, 1];

    // Handle small n directly
    if (n <= 4) return [2, 2];

    // Mirror if playerA is in the later half
    if (playerA - 1 > n - playerB) {
        const mirroredA = n + 1 - playerB;
        const mirroredB = n + 1 - playerA;
        playerA = mirroredA;
        playerB = mirroredB;
    }

    const nextRoundPlayers = Math.floor((n + 1) / 2);
    let minRound = n;
    let maxRound = 1;

    if (playerB * 2 <= n + 1) {
        const leftFree = playerA - 1;
        const middleGap = playerB - playerA - 1;
        for (let i = 0; i <= leftFree; i++) {
            for (let j = 0; j <= middleGap; j++) {
                const [earliest, latest] = earliestAndLatest(nextRoundPlayers, i + 1, i + j + 2);
                minRound = Math.min(minRound, 1 + earliest);
                maxRound = Math.max(maxRound, 1 + latest);
            }
        }
    } else {
        const mirroredB = n + 1 - playerB;
        const leftFree = playerA - 1;
        const middleGap = mirroredB - playerA - 1;
        const innerGap = playerB - mirroredB - 1;

        for (let i = 0; i <= leftFree; i++) {
            for (let j = 0; j <= middleGap; j++) {
                const newSecondPlayer = i + j + 2 + Math.floor((innerGap + 1) / 2);
                const [earliest, latest] = earliestAndLatest(nextRoundPlayers, i + 1, newSecondPlayer);
                minRound = Math.min(minRound, 1 + earliest);
                maxRound = Math.max(maxRound, 1 + latest);
            }
        }
    }

    return [minRound, maxRound];
};