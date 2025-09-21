# Pre-sorted Shops Lazy Filter | 55 Lines | O(E log E) Init | 467ms

# Intuition
The key insight is to pre-sort shops by price and shop ID during initialization, then use lazy filtering to skip rented items during search operations. This trades initialization time for fast query performance.

# Approach
1. **Data Structures:**
   - `priceByShopMovie`: Map for O(1) price lookup using "shop#movie" keys
   - `shopsByMovie`: Pre-sorted arrays of [price, shopId] per movie
   - `currentlyRented`: Set tracking currently rented items

2. **Pre-sorting:** During construction, sort all shops for each movie by price, then by shop ID. This ensures search operations can return results in the correct order.

3. **Search:** Linear scan through pre-sorted shops, skipping rented ones until we find 5 available shops.

4. **Rent/Drop:** Simple O(1) set operations.

5. **Report:** Collect all rented items, sort by price/shop/movie, return top 5.

# Complexity
- **Time:**
  - Constructor: O(E log E) where E is number of entries
  - search: O(S) where S is shops per movie (early termination at 5)
  - rent/drop: O(1)
  - report: O(R log R) where R is currently rented movies
- **Space:** O(E) for storing all entries

# Code
```typescript
class MovieRentingSystem {
    private priceByShopMovie: Map<string, number>;
    private shopsByMovie: Map<number, Array<[number, number]>>;
    private currentlyRented: Set<string>;
    
    private createKey(shopId: number, movieId: number): string {
        return `${shopId}#${movieId}`;
    }

    constructor(totalShops: number, entries: number[][]) {
        this.priceByShopMovie = new Map();
        this.shopsByMovie = new Map();
        this.currentlyRented = new Set();

        for (const [shopId, movieId, rentalPrice] of entries) {
            const shopMovieKey = this.createKey(shopId, movieId);
            this.priceByShopMovie.set(shopMovieKey, rentalPrice);
            
            if (!this.shopsByMovie.has(movieId)) {
                this.shopsByMovie.set(movieId, []);
            }
            this.shopsByMovie.get(movieId)!.push([rentalPrice, shopId]);
        }

        for (const shopList of this.shopsByMovie.values()) {
            shopList.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
        }
    }

    search(movieId: number): number[] {
        const availableShops: number[] = [];
        const shopsWithMovie = this.shopsByMovie.get(movieId) || [];
        
        for (const [price, shopId] of shopsWithMovie) {
            if (!this.currentlyRented.has(this.createKey(shopId, movieId))) {
                availableShops.push(shopId);
                if (availableShops.length === 5) break;
            }
        }
        
        return availableShops;
    }

    rent(shopId: number, movieId: number): void {
        this.currentlyRented.add(this.createKey(shopId, movieId));
    }

    drop(shopId: number, movieId: number): void {
        this.currentlyRented.delete(this.createKey(shopId, movieId));
    }

    report(): number[][] {
        const rentedMovies: Array<[number, number, number]> = [];
        
        for (const shopMovieKey of this.currentlyRented) {
            const [shopIdStr, movieIdStr] = shopMovieKey.split('#');
            const shopId = Number(shopIdStr);
            const movieId = Number(movieIdStr);
            const price = this.priceByShopMovie.get(shopMovieKey)!;
            rentedMovies.push([price, shopId, movieId]);
        }
        
        rentedMovies.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2]));

        const topRentals: number[][] = [];
        for (let index = 0; index < rentedMovies.length && index < 5; index++) {
            topRentals.push([rentedMovies[index][1], rentedMovies[index][2]]);
        }
        
        return topRentals;
    }
}