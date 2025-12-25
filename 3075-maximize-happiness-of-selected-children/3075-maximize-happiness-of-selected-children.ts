function maximumHappinessSum(happiness: number[], k: number): number {
    happiness.sort((a, b) => b - a);
    let total = 0;
    for (let i = 0; i < k; i++){
        let val = happiness[i] - i;
        if (val > 0){
            total += val;
        }
    }
    return total;
};