function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
    const MOD = 1000000007;
    const know = new Deque<number[]>();
    const share = new Deque<number[]>();
    know.pushBack([1, 1]);
    let knowCnt = 1,
        shareCnt = 0;

    for (let i = 2; i <= n; i++) {
        if (!know.isEmpty() && know.front()[0] === i - delay) {
            const first = know.popFront();
            knowCnt = (knowCnt - first[1] + MOD) % MOD;
            shareCnt = (shareCnt + first[1]) % MOD;
            share.pushBack(first);
        }
        if (!share.isEmpty() && share.front()[0] === i - forget) {
            const first = share.popFront();
            shareCnt = (shareCnt - first[1] + MOD) % MOD;
        }
        if (!share.isEmpty()) {
            knowCnt = (knowCnt + shareCnt) % MOD;
            know.pushBack([i, shareCnt]);
        }
    }
    return (knowCnt + shareCnt) % MOD;
}