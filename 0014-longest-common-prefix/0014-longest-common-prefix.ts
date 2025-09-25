function longestCommonPrefix(strs: string[]): string {
    if (!strs.length) return "";
    strs.sort();
    const first = strs[0], last = strs[strs.length - 1];
    let result = "";
    for (let i = 0; i < first.length; i++) {
        if (first[i] === last[i]) {
            result += first[i];
        } else {
            break;
        }
    }
    return result;
}