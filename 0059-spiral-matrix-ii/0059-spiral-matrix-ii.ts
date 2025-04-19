function generateMatrix(n: number): number[][] {
    const result = Array.from({ length: n }, () => Array(n));
    let len = n, dir = 1, vDir = false, steps = n, x = -1, y = 0;
    for (let val = 1; val <= n * n; val++) {
        if (steps === 0) { // change direction
            if (vDir) dir = -dir;
            else len--;

            vDir = !vDir;
            steps = len;
        }
        
        if (vDir) y += dir;
        else x += dir;

        result[y][x] = val;
        steps--;
    }
    
    return result;
};