function minTime(skill: number[], mana: number[]): number {
    const n = skill.length,
        m = mana.length;
    const times: number[] = new Array(n).fill(0);

    for (let j = 0; j < m; j++) {
        let curTime = 0;
        for (let i = 0; i < n; i++) {
            curTime = Math.max(curTime, times[i]) + skill[i] * mana[j];
        }
        times[n - 1] = curTime;
        for (let i = n - 2; i >= 0; i--) {
            times[i] = times[i + 1] - skill[i + 1] * mana[j];
        }
    }
    return times[n - 1];
}