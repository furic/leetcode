const maximumGain = (s: string, x: number, y: number): number => {
    let [char1, char2] = ['a', 'b'];
    if (x < y) {
        [x, y] = [y, x];
        [char1, char2] = ['b', 'a'];
    }

    let score = 0;
    let [count1, count2] = [0, 0];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === char1) {
            count1++;
        } else if (s[i] === char2) {
            if (count1 > 0) {
                count1--;
                score += x;
            } else {
                count2++;
            }
        } else {
            score += Math.min(count1, count2) * y;
            [count1, count2] = [0, 0];
        }
    }

    return score + Math.min(count1, count2) * y;
};