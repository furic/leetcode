function minTime(skill: number[], mana: number[]): number {
    const n = skill.length, m = mana.length;
    const done: number[] = new Array(n + 1).fill(0);

    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n; i++) {
            done[i + 1] = Math.max(done[i + 1], done[i]) + mana[j] * skill[i];
        }
        for (let i = n - 1; i > 0; i--) {
            done[i] = done[i + 1] - mana[j] * skill[i];
        }
    }

    return done[n];
}