function maximumHappinessSum(happiness: number[], k: number): number {

    // First thing is sort
    // Grab the max one
    // Then grab in order until complete
    // Keep track of rounds, so that we don't get in the negative
    // happiness side


    let currHappiness = 0;

    happiness.sort((a, b) => a - b);

    let rounds = 0;

    for (let i = happiness.length - 1; i >= 0; i--) {

        // Substract round

        const thisHappiness = happiness[i] - rounds;

        if (thisHappiness <= 0) {
            break;
        }

        currHappiness += thisHappiness;

        rounds++;

        if (rounds === k) {
            break;
        }

    }



    return currHappiness;


};