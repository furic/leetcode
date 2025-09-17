# Priority Queue Lazy Deletion | 48 Lines | O(log n) | 88ms

# Intuition
This system needs to efficiently track the highest-rated food for each cuisine while supporting rating updates. The key insight is to use a priority queue for each cuisine to maintain ranking order, combined with a lookup table for authoritative data. Since priority queues don't support efficient arbitrary element updates, we can use a "lazy deletion" strategy where we add updated entries and filter out stale ones when accessing the top.

# Approach
I'll use a dual data structure approach with lazy deletion:

1. **Authoritative Lookup Table**: A hash map storing the current state of each food item. This serves as the single source of truth for current ratings.

2. **Priority Queue per Cuisine**: Each cuisine has its own priority queue ordered by rating (descending) and name (ascending for tie-breaking). This enables O(log n) insertions and O(1) access to the highest-rated item.

3. **Lazy Deletion Strategy**: Instead of removing outdated entries from priority queues (which is expensive), add new entries for rating updates and filter stale entries only when accessing the top element.

4. **Custom Comparator**: Sort by rating descending first, then by lexicographical name ascending to handle ties correctly.

5. **Update Process**: When changing a rating, update the authoritative lookup table and add a new entry to the appropriate priority queue. The old entry becomes "stale" but doesn't need immediate removal.

6. **Query Process**: When finding the highest-rated food, peek at the top of the priority queue and verify it matches the authoritative data. If stale, remove it and check the next item.

# Complexity
- Time complexity: $$O(\log n)$$
  - Constructor: O(n log n) for initializing priority queues
  - changeRating: O(log n) for priority queue insertion
  - highestRated: O(k log n) where k is the number of stale entries to remove, amortized O(log n)

- Space complexity: $$O(n)$$
  - Lookup table stores n food items: O(n)
  - Priority queues may store multiple copies of updated items, but bounded by total updates
  - Overall space is O(n + u) where u is number of updates

# Code
```typescript []
type FoodItem = {
    name: string;
    rating: number;
    cuisine: string;
};

const compareFoodItems = (first: FoodItem, second: FoodItem): number => {
    return second.rating - first.rating || first.name.localeCompare(second.name);
};

class FoodRatings {
    private foodLookupTable: Map<string, FoodItem>;
    
    private cuisineRankings: Map<string, PriorityQueue<FoodItem>>;

    constructor(foods: string[], cuisines: string[], ratings: number[]) {
        this.foodLookupTable = new Map();
        this.cuisineRankings = new Map();

        for (const cuisineType of cuisines) {
            if (this.cuisineRankings.has(cuisineType)) continue;
            this.cuisineRankings.set(cuisineType, new PriorityQueue(compareFoodItems));
        }

        for (let index = 0; index < foods.length; index++) {
            const foodItem: FoodItem = {
                name: foods[index],
                rating: ratings[index],
                cuisine: cuisines[index],
            };
            
            this.foodLookupTable.set(foods[index], foodItem);
            
            this.cuisineRankings.get(cuisines[index])!.enqueue({ ...foodItem });
        }
    }

    changeRating(foodName: string, newRating: number): void {
        const foodItem = this.foodLookupTable.get(foodName)!;
        foodItem.rating = newRating;

        this.cuisineRankings.get(foodItem.cuisine)!.enqueue({ ...foodItem });
    }

    highestRated(cuisineType: string): string {
        const priorityQueue = this.cuisineRankings.get(cuisineType)!;

        let frontItem = priorityQueue.front()!;
        while (frontItem.rating !== this.foodLookupTable.get(frontItem.name)!.rating) {
            priorityQueue.dequeue();
            frontItem = priorityQueue.front()!;
        }
        
        return priorityQueue.front()!.name;
    }
}
```