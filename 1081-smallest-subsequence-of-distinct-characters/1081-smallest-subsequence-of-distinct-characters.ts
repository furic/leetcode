function smallestSubsequence(s: string): string {
    let stack: string[] = [];
    let seen = new Set<string>();
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (seen.has(char)) continue;
        while (stack.length
            && stack.at(-1) > char
            && s.lastIndexOf(stack.at(-1)) > i
        ) {
            const last = stack.pop();
            seen.delete(last);
        }
        stack.push(char);
        seen.add(char);
    }

    return stack.join("");
};