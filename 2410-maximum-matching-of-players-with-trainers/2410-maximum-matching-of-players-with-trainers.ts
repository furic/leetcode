const matchPlayersAndTrainers = (players: number[], trainers: number[]): number => {
    var match : number = 0

    players.sort((a,b)=> a-b)
    trainers.sort((a,b)=> a-b)


    var j : number = 0

    for( var i : number = 0 ; i <  players.length ; i ++ ){
       
        while ( trainers[j] < players[i] && j < trainers.length ){

            j += 1 
        }
        
        if( j !== trainers.length ){
            j += 1
            match ++
        }


    }
    return match

};