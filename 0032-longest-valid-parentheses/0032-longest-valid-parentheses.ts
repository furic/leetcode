const longestValidParentheses = (s: string): number => {
    const stack: number[] = [-1];
    let longest = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) stack.push(i);
            else longest = Math.max(longest, i - stack[stack.length - 1]);
        }
    }

    return longest;
};