function validSequence(word1: string, word2: string): number[] {
    const n2 = word2.length;

    const dp2: number[] = new Array(n2).fill(-1);
    let j = n2 - 1;

    for (let i = word1.length - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) {
            dp2[j] = i;
            j--;
        }
    }

    let changed = 0;
    j = 0;

    const res: number[] = [];

    for (let i = 0; i < word1.length; i++) {
        if (j >= n2) {
            break;
        }

        if (word1[i] === word2[j]) {
            res.push(i);
            j++;
        } else if (changed === 0) {
            if (j === n2 - 1 || i + 1 <= dp2[j + 1]) {
                changed = 1;
                res.push(i);
                j++;
            }
        }
    }

    return j === n2 ? res : [];
};