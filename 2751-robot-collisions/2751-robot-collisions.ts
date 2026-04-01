function survivedRobotsHealths(
    pos: number[],
    h: number[],
    d: string
): number[] {

    const n = pos.length;

    const order = Array.from({length:n}, (_,i)=>i)
        .sort((a,b)=>pos[a]-pos[b]);

    const alive = new Array(n).fill(true);
    const stack: number[] = [];

    for (const idx of order) {

        if (d[idx] === 'R') {
            stack.push(idx);
        } else {

            while (stack.length) {

                const top = stack[stack.length-1];

                if (h[top] < h[idx]) {
                    alive[top] = false;
                    stack.pop();
                    h[idx]--;
                }
                else if (h[top] > h[idx]) {
                    alive[idx] = false;
                    h[top]--;
                    break;
                }
                else {
                    alive[top] = false;
                    alive[idx] = false;
                    stack.pop();
                    break;
                }
            }
        }
    }

    const res: number[] = [];
    for (let i = 0; i < n; i++)
        if (alive[i]) res.push(h[i]);

    return res;
}