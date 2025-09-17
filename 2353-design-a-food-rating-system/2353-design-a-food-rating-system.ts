type FoodItem = {
    name: string;
    rating: number;
    cuisine: string;
};

const compareFoodItems = (first: FoodItem, second: FoodItem): number => {
    return second.rating - first.rating || first.name.localeCompare(second.name);
};

class FoodRatings {
    // Authoritative source: maps food name to current food data
    private foodLookupTable: Map<string, FoodItem>;
    
    // Ranking system: maps cuisine to priority queue of food items
    private cuisineRankings: Map<string, PriorityQueue<FoodItem>>;

    constructor(foods: string[], cuisines: string[], ratings: number[]) {
        this.foodLookupTable = new Map();
        this.cuisineRankings = new Map();

        // Initialize priority queues for each unique cuisine
        for (const cuisineType of cuisines) {
            if (this.cuisineRankings.has(cuisineType)) continue;
            this.cuisineRankings.set(cuisineType, new PriorityQueue(compareFoodItems));
        }

        // Populate food data and rankings
        for (let index = 0; index < foods.length; index++) {
            const foodItem: FoodItem = {
                name: foods[index],
                rating: ratings[index],
                cuisine: cuisines[index],
            };
            
            this.foodLookupTable.set(foods[index], foodItem);
            
            // Add copy to priority queue (enables lazy deletion strategy)
            this.cuisineRankings.get(cuisines[index])!.enqueue({ ...foodItem });
        }
    }

    changeRating(foodName: string, newRating: number): void {
        // Update authoritative rating in lookup table
        const foodItem = this.foodLookupTable.get(foodName)!;
        foodItem.rating = newRating;

        // Add updated version to priority queue (lazy deletion approach)
        // Old entries become stale but are filtered out when accessed
        this.cuisineRankings.get(foodItem.cuisine)!.enqueue({ ...foodItem });
    }

    highestRated(cuisineType: string): string {
        const priorityQueue = this.cuisineRankings.get(cuisineType)!;

        // Remove stale entries from front of queue until we find current data
        // This lazy deletion ensures we always get the most up-to-date highest rated item
        let frontItem = priorityQueue.front()!;
        while (frontItem.rating !== this.foodLookupTable.get(frontItem.name)!.rating) {
            priorityQueue.dequeue(); // Remove stale entry
            frontItem = priorityQueue.front()!;
        }
        
        return priorityQueue.front()!.name;
    }
}