function angleClock(hour: number, minutes: number) {
    const d = Math.abs(((hour % 12) + minutes / 60) / 12 - minutes / 60) * 360;
    return Math.min(d, 360 - d);
}