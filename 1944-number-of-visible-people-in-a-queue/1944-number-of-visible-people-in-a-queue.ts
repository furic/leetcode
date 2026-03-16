const canSeePersonsCount = (heights: number[]): number[] => {
    const visibleCount = new Array(heights.length).fill(0);
    const stack: number[] = []; // Indices of people not yet blocked

    for (let i = 0; i < heights.length; i++) {
        // Current person is taller than stack top — stack top can see current person
        while (stack.length > 0 && heights[i] > heights[stack[stack.length - 1]]) {
            visibleCount[stack.pop()!]++;
        }

        // Current person is shorter than (or equal to) the new stack top — stack top can see current person
        if (stack.length > 0) visibleCount[stack[stack.length - 1]]++;

        stack.push(i);
    }

    return visibleCount;
};