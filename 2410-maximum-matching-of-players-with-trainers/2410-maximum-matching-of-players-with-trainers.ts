const matchPlayersAndTrainers = (players: number[], trainers: number[]): number => {
    players.sort((a, b) => a - b);
    trainers.sort((a, b) => a - b);

    let playerIdx = 0;
    let trainerIdx = 0;
    let matches = 0;

    while (playerIdx < players.length && trainerIdx < trainers.length) {
        if (players[playerIdx] <= trainers[trainerIdx]) {
            matches++;
            playerIdx++;
            trainerIdx++;
        } else {
            trainerIdx++;
        }
    }

    return matches;
};