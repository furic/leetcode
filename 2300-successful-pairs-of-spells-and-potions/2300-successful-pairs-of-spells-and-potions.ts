function successfulPairs(spells, potions, success) {
    const p = potions.sort((a, b) => b - a).length;
    return spells.map((num) => {
        let l = 0, r = p - 1;
        while (l <= r) {
            const m = (r + l) >> 1;
            num * potions[m] < success ? r = m - 1 : l = m + 1;
        }
        return l; // or return r + 1
    });
}