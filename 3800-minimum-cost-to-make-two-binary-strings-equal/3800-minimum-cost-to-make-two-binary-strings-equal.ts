function minimumCost(s: string, t: string, flipCost: number, swapCost: number, crossCost: number): number {
    let countA = 0;
    let countB =0;

    for(let i=0;i<s.length; i++){
        if(s[i]=='0' && t[i]==='1'){
            countA++;
        }else if(s[i]=='1' && t[i]==='0'){
            countB++;
        }
    }

    let total = 0;

    let pairAB = Math.min(countA, countB);
    total+=pairAB * Math.min(2 * flipCost, swapCost)
    let remaining = Math.max(countA, countB)-pairAB;

    total+=Math.floor(remaining/2) * Math.min(2 * flipCost, crossCost + swapCost);

    if(remaining%2==1){
        total+=flipCost;
    }
    return total
};