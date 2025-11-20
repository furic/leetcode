function intersectionSizeTwo(it: number[][]): number {
    it.sort((a,b)=>a[1]-b[1]);
    const rst:number[]=[];
    const check = (tg:number[])=>{
        let ct=0;
        for(let i=rst.length-1;i>=0;i--){
            if(rst[i]>=tg[0] && rst[i]<=tg[1]){
                ct++;
            }
            if(ct>=2){
                return 2;
            }
            if(rst[i]<tg[0]){
                return ct;
            }
        }
        return ct;
    }
    for(let c of it){
        let count=check(c);
        if(count===2){
            continue;
        } else {
            if(count===0){
                rst.push(c[1]-1);
                rst.push(c[1]);
            }
            if(count === 1) {
                if(rst[rst.length-1] === c[1]) {
                    rst.push(c[1]-1);
                } else {
                    rst.push(c[1]);
                }
                rst.sort((a,b)=>a-b);
            }
        }
    }
    return rst.length;
};