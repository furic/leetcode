function countCollisions(directions: string): number {
    let res: number = 0;
    let flag: number = -1;
    for (let i = 0; i < directions.length; i++) {
        const c: string = directions[i];
        if (c === "L") {
            if (flag >= 0) {
                res += flag + 1;
                flag = 0;
            }
        } else if (c === "S") {
            if (flag > 0) {
                res += flag;
            }
            flag = 0;
        } else {
            if (flag >= 0) {
                flag++;
            } else {
                flag = 1;
            }
        }
    }
    return res;
}