function minRemoveToMakeValid(s: string): string {
    const result = s.split(''); // Convert the string into an array for easy manipulation
    const stack: number[] = []; // Stack to track indices of unmatched '('

    // Traverse the string to find unmatched parentheses
    for (let i = 0; i < result.length; i++) {
        if (result[i] === '(') {
            stack.push(i); // Record index of '('
        } else if (result[i] === ')') {
            if (stack.length > 0) {
                stack.pop(); // Match ')' with a previous '('
            } else {
                result[i] = ''; // Replace unmatched ')' with an empty string
            }
        }
    }

    // Remove unmatched '(' by using their indices from the stack
    while (stack.length > 0) {
        result[stack.pop()] = ''; // Replace unmatched '(' with an empty string
    }

    return result.join(''); // Convert the array back to a string and return
};