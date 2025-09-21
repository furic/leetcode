class MovieRentingSystem {
    // Maps "shop#movie" -> rental price
    private priceByShopMovie: Map<string, number>;
    
    // Maps movie ID -> sorted list of [price, shopId] for all shops with that movie
    private shopsByMovie: Map<number, Array<[number, number]>>;
    
    // Set of currently rented "shop#movie" keys
    private currentlyRented: Set<string>;
    
    // Create unique key for shop-movie combination
    private createKey(shopId: number, movieId: number): string {
        return `${shopId}#${movieId}`;
    }

    constructor(totalShops: number, entries: number[][]) {
        this.priceByShopMovie = new Map();
        this.shopsByMovie = new Map();
        this.currentlyRented = new Set();

        // Build data structures from initial inventory
        for (const [shopId, movieId, rentalPrice] of entries) {
            const shopMovieKey = this.createKey(shopId, movieId);
            this.priceByShopMovie.set(shopMovieKey, rentalPrice);
            
            // Group shops by movie ID
            if (!this.shopsByMovie.has(movieId)) {
                this.shopsByMovie.set(movieId, []);
            }
            this.shopsByMovie.get(movieId)!.push([rentalPrice, shopId]);
        }

        // Pre-sort shops for each movie by price, then by shop ID
        for (const shopList of this.shopsByMovie.values()) {
            shopList.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
        }
    }

    search(movieId: number): number[] {
        const availableShops: number[] = [];
        const shopsWithMovie = this.shopsByMovie.get(movieId) || [];
        
        // Find up to 5 cheapest unrented copies
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
        // Collect all rented movies with their details
        const rentedMovies: Array<[number, number, number]> = []; // [price, shopId, movieId]
        
        for (const shopMovieKey of this.currentlyRented) {
            const [shopIdStr, movieIdStr] = shopMovieKey.split('#');
            const shopId = Number(shopIdStr);
            const movieId = Number(movieIdStr);
            const price = this.priceByShopMovie.get(shopMovieKey)!;
            rentedMovies.push([price, shopId, movieId]);
        }
        
        // Sort by price, then shop ID, then movie ID
        rentedMovies.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2]));

        // Return top 5 as [shopId, movieId] pairs
        const topRentals: number[][] = [];
        for (let index = 0; index < rentedMovies.length && index < 5; index++) {
            topRentals.push([rentedMovies[index][1], rentedMovies[index][2]]);
        }
        
        return topRentals;
    }
}