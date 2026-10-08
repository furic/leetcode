function removeOuterParentheses(s: string): string {
    let res = '', lvl = 0;

    for (const c of s)
        if ((c === '(' && lvl++) || (c === ')' && --lvl))
            res += c;

    return res;
}