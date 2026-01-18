/**
 * Auction system that manages real-time bids from multiple users
 * Uses lazy caching to optimize getHighestBidder queries
 * Cache is invalidated when modifications might affect the highest bidder
 */
class AuctionSystem {
    // Maps itemId → Map(userId → bidAmount)
    // Stores all active bids for each item
    private readonly bidsByItem: Map<number, Map<number, number>>;
    
    // Cached highest bidder for each item: itemId → {userId, bidAmount}
    // Lazily computed and invalidated when necessary
    private readonly highestBidderCache: Map<number, { userId: number; bidAmount: number }>;

    constructor() {
        this.bidsByItem = new Map();
        this.highestBidderCache = new Map();
    }

    /**
     * Adds or replaces a bid for an item
     * Updates cache if new bid affects the highest bidder
     */
    addBid(userId: number, itemId: number, bidAmount: number): void {
        // Initialize item's bid map if it doesn't exist
        if (!this.bidsByItem.has(itemId)) {
            this.bidsByItem.set(itemId, new Map());
        }
        
        // Add or update the bid (replaces if user already bid)
        this.bidsByItem.get(itemId)!.set(userId, bidAmount);
        
        // Update cache if it exists and this bid affects it
        const cachedHighest = this.highestBidderCache.get(itemId);
        if (!cachedHighest) {
            // No cache yet, will be computed lazily on next getHighestBidder call
            return;
        }
        
        if (bidAmount > cachedHighest.bidAmount) {
            // New bid is higher than cached highest, update cache
            this.highestBidderCache.set(itemId, { userId, bidAmount });
            return;
        }
        
        if (userId === cachedHighest.userId && bidAmount < cachedHighest.bidAmount) {
            // Current highest bidder lowered their bid, cache is invalid
            this.highestBidderCache.delete(itemId);
        }
    }

    /**
     * Updates an existing bid to a new amount
     * Guaranteed that the bid exists
     */
    updateBid(userId: number, itemId: number, newAmount: number): void {
        // Update the bid amount (guaranteed to exist)
        this.bidsByItem.get(itemId)!.set(userId, newAmount);
        
        // Update cache if it exists and this update affects it
        const cachedHighest = this.highestBidderCache.get(itemId);
        if (!cachedHighest) {
            return;
        }
        
        if (newAmount > cachedHighest.bidAmount) {
            // Updated bid is now the highest
            this.highestBidderCache.set(itemId, { userId, bidAmount: newAmount });
            return;
        }
        
        if (userId === cachedHighest.userId && newAmount < cachedHighest.bidAmount) {
            // Highest bidder lowered their bid, cache is invalid
            this.highestBidderCache.delete(itemId);
        }
    }

    /**
     * Removes a user's bid for an item
     * Guaranteed that the bid exists
     */
    removeBid(userId: number, itemId: number): void {
        // Remove the bid (guaranteed to exist)
        this.bidsByItem.get(itemId)!.delete(userId);
        
        // Update cache if removed user was the highest bidder
        const cachedHighest = this.highestBidderCache.get(itemId);
        if (!cachedHighest) {
            return;
        }
        
        if (userId === cachedHighest.userId) {
            // Removed user was the highest bidder, cache is invalid
            this.highestBidderCache.delete(itemId);
        }
    }

    /**
     * Returns the userId of the highest bidder for an item
     * Tiebreaker: If multiple users have same highest bid, return user with highest userId
     * Returns -1 if no bids exist
     */
    getHighestBidder(itemId: number): number {
        // Check cache first for O(1) lookup
        if (this.highestBidderCache.has(itemId)) {
            return this.highestBidderCache.get(itemId)!.userId;
        }
        
        // Cache miss: compute highest bidder from scratch
        let highestBidAmount = -1;
        let highestBidderId = -1;
        
        const bidsForItem = this.bidsByItem.get(itemId);
        if (!bidsForItem) {
            return -1; // No bids exist for this item
        }
        
        // Find highest bid with tiebreaker on userId
        for (const [userId, bidAmount] of bidsForItem.entries()) {
            // Update if: higher bid, OR same bid but higher userId
            if (bidAmount > highestBidAmount || 
                (bidAmount === highestBidAmount && userId > highestBidderId)) {
                highestBidAmount = bidAmount;
                highestBidderId = userId;
            }
        }
        
        // Cache the result for future queries (lazy caching)
        if (highestBidderId !== -1) {
            this.highestBidderCache.set(itemId, { 
                userId: highestBidderId, 
                bidAmount: highestBidAmount 
            });
        }
        
        return highestBidderId;
    }
}