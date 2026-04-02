function maximumAmount(coins:number[][]):number{
    const m=coins.length,n=coins[0].length
    const NEG=-1e18

    let dp=Array.from({length:n},()=>[NEG,NEG,NEG])

    for(let k=0;k<3;k++){
        dp[0][k]=k>0?Math.max(coins[0][0],0):coins[0][0]
    }

    for(let j=1;j<n;j++){
        for(let k=2;k>=0;k--){
            dp[j][k]=Math.max(dp[j][k], dp[j-1][k]+coins[0][j])
            if(k>0) dp[j][k]=Math.max(dp[j][k], dp[j-1][k-1])
        }
    }

    for(let i=1;i<m;i++){
        const ndp=Array.from({length:n},()=>[NEG,NEG,NEG])

        for(let j=0;j<n;j++){
            for(let k=2;k>=0;k--){
                if(dp[j][k]!=NEG)
                    ndp[j][k]=Math.max(ndp[j][k], dp[j][k]+coins[i][j])
                if(k>0 && dp[j][k-1]!=NEG)
                    ndp[j][k]=Math.max(ndp[j][k], dp[j][k-1])
                if(j>0){
                    if(ndp[j-1][k]!=NEG)
                        ndp[j][k]=Math.max(ndp[j][k], ndp[j-1][k]+coins[i][j])
                    if(k>0 && ndp[j-1][k-1]!=NEG)
                        ndp[j][k]=Math.max(ndp[j][k], ndp[j-1][k-1])
                }
            }
        }
        dp=ndp
    }

    return dp[n-1][2]
}