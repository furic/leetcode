const angleClock = (hour: number, minutes: number): number => {
    const hourAngle   = ((hour % 12) + minutes / 60) / 12 * 360;
    const minuteAngle = minutes / 60 * 360;
    const diff = Math.abs(hourAngle - minuteAngle);
    return Math.min(diff, 360 - diff);
};