const kthCharacter = (k: number): string => {
    let ans = 0;
    while (k !== 1) {
        let t = 31 - Math.clz32(k);
        if (1 << t === k) {
            t--;
        }
        k -= 1 << t;
        ans++;
    }
    return String.fromCharCode("a".charCodeAt(0) + ans);
};