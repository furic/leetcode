const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Converts a date in "MM-DD" format to the day of the year (1-based).
 */
const dateToDayOfYear = (date: string): number => {
    const month = parseInt(date.slice(0, 2), 10);
    const day = parseInt(date.slice(3, 5), 10);
    let dayOfYear = day;
    for (let i = 0; i < month - 1; i++) {
        dayOfYear += daysInMonth[i];
    }
    return dayOfYear;
};

/**
 * Returns the number of overlapping days Alice and Bob are in Rome.
 */
const countDaysTogether = (
    arriveAlice: string,
    leaveAlice: string,
    arriveBob: string,
    leaveBob: string
): number => {
    const aliceStart = dateToDayOfYear(arriveAlice);
    const aliceEnd = dateToDayOfYear(leaveAlice);
    const bobStart = dateToDayOfYear(arriveBob);
    const bobEnd = dateToDayOfYear(leaveBob);

    const overlapStart = Math.max(aliceStart, bobStart);
    const overlapEnd = Math.min(aliceEnd, bobEnd);

    return Math.max(0, overlapEnd - overlapStart + 1);
};