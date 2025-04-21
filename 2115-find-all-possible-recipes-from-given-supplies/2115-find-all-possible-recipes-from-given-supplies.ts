function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
    const suppliesSet = new Set<string>(supplies);
    const cockableMap = new Map<string, number>(); // -2: cooking or cant cooked, -1: cooked, 0..n-1: index

    const cook = (i: number) => {
        for (const ingredient of ingredients[i]) {
            if (suppliesSet.has(ingredient)) continue; // has raw ingredient
            let j = cockableMap.get(ingredient);
            if (j >= 0) { // not cooked
                cockableMap.set(recipes[i], -2); // set cooking
                cook(j);
                j = cockableMap.get(ingredient);
            }
            if (j === -1) continue; // set cooked
            cockableMap.set(recipes[i], -2); // cant cooked or absent
            return;
        }
        cockableMap.set(recipes[i], -1);
    };

    for (let i = 0; i < recipes.length; i++) {
        cockableMap.set(recipes[i], i); // cockableMap = {<name>: 0..n-1}
    }
    for (let i = 0; i < recipes.length; i++) {
        if (cockableMap.get(recipes[i]) >= 0) {
            cook(i); // cockableMap = {<name>: -1 || -2}
        }
    }

    return recipes.filter((r) => cockableMap.get(r) === -1);
};