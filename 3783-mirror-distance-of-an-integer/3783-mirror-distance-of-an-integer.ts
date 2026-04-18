function mirrorDistance(n: number): number {
    // return (n - Number(n.toString())) * -1

    let numArr = n.toString().split("")
    let reverseArr = []
    for (let i = numArr.length; i > 0; i--) {
        reverseArr.push(numArr[i-1])
    }

    return Math.abs(n - Number(reverseArr.join("")))
};