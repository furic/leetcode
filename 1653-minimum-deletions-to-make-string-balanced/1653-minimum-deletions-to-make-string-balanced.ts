function minimumDeletions(s: string): number {
    let aDels = 0;
    let bDels = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a') {
            bDels = Math.min(aDels, 1 + bDels);
        } else {
            aDels++;
        }
    }

    return bDels;
};