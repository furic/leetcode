const maxActiveSectionsAfterTrade = (s: string): number => {
    let totalOnes = 0;
    let prevZeroRun = 0;
    let maxGain = 0;

    for (let i = 0; i < s.length; ) {
        let onesRun = 0;
        while (i < s.length && s[i] === '1') { i++; totalOnes++; onesRun++; }

        let zerosRun = 0;
        while (i < s.length && s[i] === '0') { i++; zerosRun++; }

        // A valid trade merges prevZeroRun + zerosRun by flipping the ones block between them
        if (prevZeroRun > 0 && onesRun > 0 && zerosRun > 0)
            maxGain = Math.max(maxGain, prevZeroRun + zerosRun);

        prevZeroRun = zerosRun;
    }

    return totalOnes + maxGain;
};