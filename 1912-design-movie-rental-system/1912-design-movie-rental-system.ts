class MovieRentingSystem {
    private price: Map<string, number>;                           
    private movieShops: Map<number, Array<[number, number]>>;     
    private rented: Set<string>;                                  
    private encode(shop: number, movie: number): string {
        return `${shop}#${movie}`;
    }
    constructor(n: number, entries: number[][]) {
        this.price = new Map();
        this.movieShops = new Map();
        this.rented = new Set();

        for (const [shop, movie, p] of entries) {
            const key = this.encode(shop, movie);
            this.price.set(key, p);
            if (!this.movieShops.has(movie)) this.movieShops.set(movie, []);
            this.movieShops.get(movie)!.push([p, shop]);
        }

        for (const arr of this.movieShops.values()) {
            arr.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
        }
    }

    search(movie: number): number[] {
        const res: number[] = [];
        const arr = this.movieShops.get(movie) || [];
        for (const [p, shop] of arr) {
            if (!this.rented.has(this.encode(shop, movie))) {
                res.push(shop);
                if (res.length === 5) break;
            }
        }
        return res;
    }

    rent(shop: number, movie: number): void {
        this.rented.add(this.encode(shop, movie));
    }

    drop(shop: number, movie: number): void {
        this.rented.delete(this.encode(shop, movie));
    }

    report(): number[][] {
        const tmp: Array<[number, number, number]> = []; // [price, shop, movie]
        for (const key of this.rented) {
            const [shopStr, movieStr] = key.split('#');
            const shop = Number(shopStr);
            const movie = Number(movieStr);
            const p = this.price.get(key)!;
            tmp.push([p, shop, movie]);
        }
        tmp.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2]));

        const res: number[][] = [];
        for (let i = 0; i < tmp.length && i < 5; i++) {
            res.push([tmp[i][1], tmp[i][2]]);
        }
        return res;
    }
}