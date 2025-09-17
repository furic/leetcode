type FoodItem = {
    name: string,
    rating: number
}

class FoodRatings {

    private foodRatings: Map<string, number> = new Map();
    private foodCuisineMap: Map<string, string> = new Map();
    private cuisineHeapMap: Map<string, MaxPriorityQueue<FoodItem>> = new Map();
    constructor(foods: string[], cuisines: string[], ratings: number[]) {
        for(let i = 0; i < foods.length; i++) {
            this.foodRatings.set(foods[i], ratings[i]);
            this.foodCuisineMap.set(foods[i], cuisines[i]);

            let foodItem: FoodItem = {
                name: foods[i],
                rating: ratings[i]
            }

            let maxHeap: MaxPriorityQueue<FoodItem> = this.cuisineHeapMap.get(cuisines[i]) 
                || new MaxPriorityQueue({ compare: (a: FoodItem, b: FoodItem) => {
                    return a.rating == b.rating ? b.name.localeCompare(a.name) : a.rating - b.rating;
                }})
            maxHeap.enqueue(foodItem);
            this.cuisineHeapMap.set(cuisines[i], maxHeap);
        }
    }

    changeRating(food: string, newRating: number): void {
        const cuisine = this.foodCuisineMap.get(food);
        const maxHeap = this.cuisineHeapMap.get(cuisine);
        maxHeap.enqueue({ name: food, rating: newRating })
        this.cuisineHeapMap.set(cuisine, maxHeap);
        this.foodRatings.set(food, newRating);
    }

    highestRated(cuisine: string): string {
        const maxHeap = this.cuisineHeapMap.get(cuisine);
        let topRated: FoodItem = maxHeap.front();
        while (this.foodRatings.get(topRated.name) !== topRated.rating) {
            maxHeap.dequeue();
            topRated = maxHeap.front();
        }
        return maxHeap.front().name;
    }
}