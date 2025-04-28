const findCommonResponse = (responses: string[][]): string => {
    const map: Map<string, number> = new Map();
    responses.forEach((response) => {
        const uniqueResonse = [...new Set(response)];
        uniqueResonse.forEach((r) => {
            map.set(r, (map.get(r) || 0) + 1);
        });
    });
    return [...map.entries()].reduce(
        (best, current) =>
            current[1] > best[1] ||
            (current[1] === best[1] && current[0] < best[0])
                ? current
                : best,
        ["", -Infinity]
    )[0];
};