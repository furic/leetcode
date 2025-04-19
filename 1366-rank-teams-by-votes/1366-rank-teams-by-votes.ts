const rankTeams = (votes: string[]): string => {
    const teamCount = votes[0].length;
    const teamVoteMap = new Map<string, number[]>(); // Key: team, value: array of vote count on each rank, e.g. [1st_count, 2nd_count, ...]

    for (const team of votes[0]) {
        teamVoteMap.set(team, Array(teamCount).fill(0));
    }
    
    for (const vote of votes) {
        for (let rank = 0; rank < teamCount; rank++) {
            const team = vote[rank];
            teamVoteMap.get(team)[rank]++;
        }
    }
    
    const sortedTeams = Array.from(teamVoteMap.keys()).sort((a, b) => {
        const aRanks = teamVoteMap.get(a);
        const bRanks = teamVoteMap.get(b);
        for (let i = 0; i < teamCount; i++) {
            if (aRanks[i] !== bRanks[i]) {
                return bRanks[i] - aRanks[i];
            }
        }
        return a.localeCompare(b);
    });
    
    return sortedTeams.join('');
};