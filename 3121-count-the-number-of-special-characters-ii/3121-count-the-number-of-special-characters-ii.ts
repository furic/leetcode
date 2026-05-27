const numberOfSpecialChars = (word: string): number => {
    // -1 = unseen, 0 = lowercase seen, 1 = special (lower then upper), -2 = disqualified
    const state = new Array(26).fill(-1);

    for (const ch of word) {
        const idx = ch.charCodeAt(0);
        if (idx >= 97) {
            // lowercase
            const i = idx - 97;
            if (state[i] === 1) state[i] = -2; // uppercase already seen → disqualify
            else if (state[i] === -1) state[i] = 0;
        } else {
            // uppercase
            const i = idx - 65;
            if (state[i] === 0) state[i] = 1; // lowercase came first → special
            else if (state[i] !== 1) state[i] = -2; // no lowercase yet or already special then lower seen
        }
    }

    return state.filter(s => s === 1).length;
};