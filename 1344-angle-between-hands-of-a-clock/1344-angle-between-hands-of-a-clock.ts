function angleClock(hour: number, minutes: number) {
    const d = Math.abs((hour % 12) / 12 - (11 * minutes) / 720);
    return Math.min(d, 1 - d) * 360;
}