function avoidFlood(rains: number[]): number[] {
    const n = rains.length
    const ans = new Array(n).fill(1)
    const full = new Map<number, number>()
    const dryDays: number[] = []

    for (let i = 0; i < n; i++) {
        const lake = rains[i]

        if (lake === 0) {
            dryDays.push(i)
        } else {
            ans[i] = -1
            if (full.has(lake)) {
                const lastFullDay = full.get(lake)!
                let idx = dryDays.findIndex(d => d > lastFullDay)
                if (idx === -1) return []
                ans[dryDays[idx]] = lake
                dryDays.splice(idx, 1)
            }
            full.set(lake, i)
        }
    }

    return ans
}