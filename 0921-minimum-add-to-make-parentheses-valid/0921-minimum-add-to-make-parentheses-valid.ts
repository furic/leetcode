const minAddToMakeValid = (s: string): number => {
    let openPending = 0, insertionsNeeded = 0;

    for (const ch of s) {
        if (ch === '(') {
            openPending++;
        } else if (openPending > 0) {
            openPending--;
        } else {
            insertionsNeeded++;
        }
    }

    return openPending + insertionsNeeded;
};