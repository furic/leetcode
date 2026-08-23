const sumGame = (num: string): boolean => {
    const half = num.length / 2;

    const analyze = (s: string): [number, number] => {
        let digitSum = 0, qCount = 0;
        for (const ch of s) {
            if (ch === '?') qCount++;
            else digitSum += +ch;
        }
        return [digitSum, qCount];
    };

    const [sum0, q0] = analyze(num.slice(0, half));
    const [sum1, q1] = analyze(num.slice(half));

    return (q0 + q1) % 2 === 1 || sum0 - sum1 !== (q1 - q0) * 9 / 2;
};