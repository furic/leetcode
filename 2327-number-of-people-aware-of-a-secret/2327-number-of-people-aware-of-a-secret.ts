const peopleAwareOfSecret = (n: number, delay: number, forget: number): number => {
    const MODULO = 1_000_000_007;
    const newPeoplePerDay = new Array(n + 1).fill(0);

    newPeoplePerDay[1] = 1; // On day 1, one person discovers the secret
    let activeSharers = 0; // People who can currently share (learned secret but haven't forgotten)

    for (let currentDay = 2; currentDay <= n; currentDay++) {
        // Add people who become eligible to share today (learned `delay` days ago)
        if (currentDay - delay >= 1) {
            activeSharers = (activeSharers + newPeoplePerDay[currentDay - delay]) % MODULO;
        }

        // Remove people who forget today (learned `forget` days ago)
        if (currentDay - forget >= 1) {
            activeSharers = (activeSharers - newPeoplePerDay[currentDay - forget] + MODULO) % MODULO;
        }

        // Each active sharer tells one new person today
        newPeoplePerDay[currentDay] = activeSharers;
    }

    // Count people who still remember: those who learned in the last `forget-1` days
    let totalWhoRemember = 0;
    for (let dayLearned = n - forget + 1; dayLearned <= n; dayLearned++) {
        totalWhoRemember = (totalWhoRemember + newPeoplePerDay[dayLearned]) % MODULO;
    }

    return totalWhoRemember;
};