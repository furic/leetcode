function canSeePersonsCount(heights: number[]): number[] {
    const stack: number[] = [];
    const ans: number[] = new Array(heights.length).fill(0);

    for (let i = 0; i < heights.length; ++i) {
        while (stack.length > 0 && heights[i] > heights[stack[stack.length - 1]]) {
            const index = stack.pop()!;
            ans[index]++;
        }

        if (stack.length > 0) {
            ans[stack[stack.length - 1]]++;
        }

        stack.push(i);
    }

    return ans;
};