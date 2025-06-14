const minMaxDifference = (num: number): number => {
    const s = num.toString();
    const min = Number(s.replaceAll(s[0], '0'));
    const i = s.search(/[^9]/);
    const max = i === -1 ? num : Number(s.replaceAll(s[i], '9'));
    return max - min;
};