function isValid(s: string): boolean {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i])
        } else {
            if (stack.length === 0) {
                return false;
            }
            const top = stack.pop();
            if (s[i] == ')' && top != '(') return false;

            if (s[i] == ']' && top != '[') return false;

            if (s[i] == '}' && top != '{') return false;
        }
    }

    return stack.length === 0;
};