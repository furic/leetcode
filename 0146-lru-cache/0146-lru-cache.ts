class LRUCache {
    private readonly capacity: number;
    private readonly cache: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        const value = this.cache.get(key);
        if (value === undefined) return -1;

        // Refresh recency: delete and re-insert to move key to Map's insertion-order tail
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    put(key: number, value: number): void {
        // Evict least recently used (Map's insertion-order head) only when adding a new key
        if (!this.cache.has(key) && this.cache.size >= this.capacity) {
            const lruKey = this.cache.keys().next().value!;
            this.cache.delete(lruKey);
        }

        // Refresh recency same as get: delete then re-insert places key at tail
        this.cache.delete(key);
        this.cache.set(key, value);
    }
}