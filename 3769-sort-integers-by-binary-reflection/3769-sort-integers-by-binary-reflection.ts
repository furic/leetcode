const sortByReflection = (nums: number[]): number[] =>
    nums
        .map((num) => ({
            num,
            reflection: parseInt(
                num.toString(2).split("").reverse().join(""),
                2
            ),
        }))
        .sort((a, b) =>
            a.reflection === b.reflection
                ? a.num - b.num
                : a.reflection - b.reflection
        )
        .map((item) => item.num);
