const smallestSubsequence = (s: string): string => {
    const stack: string[] = [];
    const inStack = new Set<string>();

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (inStack.has(ch)) continue;

        while (stack.length && stack.at(-1)! > ch && s.lastIndexOf(stack.at(-1)!) > i) {
            inStack.delete(stack.pop()!);
        }

        stack.push(ch);
        inStack.add(ch);
    }

    return stack.join('');
};