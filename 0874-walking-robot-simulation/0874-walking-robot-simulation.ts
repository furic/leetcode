function robotSim(commands: number[], obstacles: number[][]): number {
    const set = new Set<string>(obstacles.map(o => o[0] + "," + o[1]));
    const dirs: number[][] = [[0,1],[1,0],[0,-1],[-1,0]];

    let d = 0, x = 0, y = 0, res = 0;

    for (let c of commands) {
        if (c === -2) 
            d = (d + 3) % 4;
        else if (c === -1) 
            d = (d + 1) % 4;
        else {
            for (let i = 0; i < c; i++) {
                let ox = x + dirs[d][0];
                let oy = y + dirs[d][1];
                if (set.has(ox + "," + oy)) 
                    break;
                x = ox;
                y = oy;
                res = Math.max(res, x*x + y*y);
            }
        }
    }

    return res;
};