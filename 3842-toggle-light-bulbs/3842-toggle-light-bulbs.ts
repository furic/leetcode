const toggleLightBulbs = (bulbs: number[]): number[] =>
    Array.from(
        bulbs.reduce(
            (set, bulb) =>
                set.has(bulb) ? (set.delete(bulb), set) : set.add(bulb),
            new Set<number>()
        )
    ).sort((a, b) => a - b);
