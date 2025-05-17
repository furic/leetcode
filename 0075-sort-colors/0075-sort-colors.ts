const sortColors = (nums: number[]): void => {
    const counts = new Array(3).fill(0);

    for (const num of nums) {
        counts[num]++;
    }

    let start = 0;
    for (let i = 0; i < 3; i++) {
        const count = counts[i];
        const arr = new Array(count).fill(i);
        nums.splice(start, count, ...arr);
        start += counts[i];
    }
};