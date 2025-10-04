function isValid(s: string): boolean {
    let map = new Map([
        ["}", "{"],
        [")", "("],
        ["]", "["],
    ])

    let stack =  []

    for (let i of s) {
        if (map.has(i)) {
            let pop = stack.pop()
            if (pop !== map.get(i)) {
                return false
            }
        } else {
            stack.push(i)
        }
    }

    return !stack.length
};