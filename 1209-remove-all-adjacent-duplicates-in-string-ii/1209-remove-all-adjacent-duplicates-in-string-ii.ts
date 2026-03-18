const removeDuplicates = (str: string, k: number): string => {
    if (str.length < 2) return str;

    // In-place compaction: write pointer i lags behind read pointer j,
    // collapsing k-run removals as they're detected
    const chars = str.split('');
    const runLengths: number[] = [];
    let write = 0;

    for (let read = 0; read < str.length; read++) {
        chars[write] = chars[read];
        runLengths[write] = write > 0 && chars[write - 1] === chars[write]
            ? runLengths[write - 1] + 1
            : 1;

        if (runLengths[write] === k) write -= k;
        write++;
    }

    return chars.slice(0, write).join('');
};