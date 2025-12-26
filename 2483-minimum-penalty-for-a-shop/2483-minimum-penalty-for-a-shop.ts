function bestClosingTime(customers: string): number {
    let best_score = 0;
    let score = 0;
    let best_hour = -1;

    for(let i = 0; i < customers.length; i++) {
        if(customers[i] === "Y") {
            score++;
        } else {
            score--;
        }

        if(score > best_score) {
            best_score = score;
            best_hour = i;
        }
    }

    return best_hour + 1;
};