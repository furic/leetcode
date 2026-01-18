class AuctionSystem {
    private bids: Map<number, Map<number, number>>; // itemId -> userId -> current bid
    private heaps: Map<number, MaxPriorityQueue<{amount: number, userId: number}>>;
    
    constructor() {
        this.bids = new Map();
        this.heaps = new Map();
    }

    private ensureItem(itemId: number): void {
        if (!this.heaps.has(itemId)) {
            this.heaps.set(itemId, new MaxPriorityQueue({
                compare: (a, b) => {
                    // Higher amount wins, or higher userId on tie
                    if (a.amount !== b.amount) return b.amount - a.amount;
                    return b.userId - a.userId;
                }
            }));
            this.bids.set(itemId, new Map());
        }
    }

    addBid(userId: number, itemId: number, bidAmount: number): void {
        this.ensureItem(itemId);
        this.bids.get(itemId).set(userId, bidAmount);
        this.heaps.get(itemId).enqueue({amount: bidAmount, userId});
    }

    updateBid(userId: number, itemId: number, newAmount: number): void {
        // Old entry becomes stale automatically
        this.bids.get(itemId).set(userId, newAmount);
        this.heaps.get(itemId).enqueue({amount: newAmount, userId});
    }

    removeBid(userId: number, itemId: number): void {
        // Just mark as removed, heap entry becomes stale
        this.bids.get(itemId).delete(userId);
    }

    getHighestBidder(itemId: number): number {
        if (!this.heaps.has(itemId)) return -1;
        
        const heap = this.heaps.get(itemId);
        const validBids = this.bids.get(itemId);
        
        // Clean stale entries from top until we find valid one
        while (!heap.isEmpty()) {
            const top = heap.front();
            
            // Check if entry is still valid
            if (validBids.has(top.userId) && validBids.get(top.userId) === top.amount) {
                return top.userId;
            }
            
            // Stale entry - remove and continue
            heap.dequeue();
        }
        
        return -1;
    }
}