# Lazy Cache with Smart Invalidation | 107 Lines | O(1) amortized | 151ms

# Intuition

Maintain all bids in nested maps while caching the highest bidder per item. Cache is lazily computed on first query and intelligently invalidated only when modifications affect the cached highest bidder, optimizing for read-heavy workloads.

# Approach

**Data Structures:**
- `bidsByItem`: Map<itemId, Map<userId, bidAmount>> - stores all bids
- `highestBidderCache`: Map<itemId, {userId, bidAmount}> - cached results

**addBid/updateBid Logic:**
- Update bid in main map
- If no cache: skip (lazy computation)
- If new bid > cached: update cache
- If modifying cached bidder downward: invalidate cache

**removeBid Logic:**
- Remove from main map
- If removed user was cached highest: invalidate cache

**getHighestBidder Logic:**
- Check cache first (O(1) hit)
- On miss: scan all bids, find max with tiebreaker
- Cache result for future queries

**Cache Invalidation Strategy:**
- Only invalidate when cached value becomes wrong
- Modifications to non-highest bidders don't invalidate
- Lazy recomputation amortizes scan cost

**Example Trace:**
```
addBid(1,7,5): bids={7:{1:5}}, cache={}
addBid(2,7,6): bids={7:{1:5,2:6}}, cache={}
getHighestBidder(7): scan→2, cache={7:{2,6}}, return 2
updateBid(1,7,8): 8>6, cache={7:{1,8}}, return void
getHighestBidder(7): cache hit, return 1
removeBid(2,7): not highest, cache stays
getHighestBidder(7): cache hit, return 1
getHighestBidder(3): no bids, return -1
```

# Complexity

- Time complexity: **O(1) amortized per operation**
  - addBid/updateBid/removeBid: O(1) if cache valid
  - getHighestBidder: O(1) cache hit, O(b) miss where b=bids for item
  - Amortized: O(1) for read-heavy workloads

- Space complexity: **O(u×i)**
  - u = total unique (user,item) pairs
  - Nested maps: O(u)
  - Cache: O(i) for i items
  - Overall: O(u+i)

# Code
```typescript []
class AuctionSystem {
    private readonly bidsByItem: Map<number, Map<number, number>>;
    private readonly highestBidderCache: Map<number, { userId: number; bidAmount: number }>;

    constructor() {
        this.bidsByItem = new Map();
        this.highestBidderCache = new Map();
    }

    addBid(userId: number, itemId: number, bidAmount: number): void {
        if (!this.bidsByItem.has(itemId)) {
            this.bidsByItem.set(itemId, new Map());
        }
        
        this.bidsByItem.get(itemId)!.set(userId, bidAmount);
        
        const cachedHighest = this.highestBidderCache.get(itemId);
        if (!cachedHighest) {
            return;
        }
        
        if (bidAmount > cachedHighest.bidAmount) {
            this.highestBidderCache.set(itemId, { userId, bidAmount });
            return;
        }
        
        if (userId === cachedHighest.userId && bidAmount < cachedHighest.bidAmount) {
            this.highestBidderCache.delete(itemId);
        }
    }

    updateBid(userId: number, itemId: number, newAmount: number): void {
        this.bidsByItem.get(itemId)!.set(userId, newAmount);
        
        const cachedHighest = this.highestBidderCache.get(itemId);
        if (!cachedHighest) {
            return;
        }
        
        if (newAmount > cachedHighest.bidAmount) {
            this.highestBidderCache.set(itemId, { userId, bidAmount: newAmount });
            return;
        }
        
        if (userId === cachedHighest.userId && newAmount < cachedHighest.bidAmount) {
            this.highestBidderCache.delete(itemId);
        }
    }

    removeBid(userId: number, itemId: number): void {
        this.bidsByItem.get(itemId)!.delete(userId);
        
        const cachedHighest = this.highestBidderCache.get(itemId);
        if (!cachedHighest) {
            return;
        }
        
        if (userId === cachedHighest.userId) {
            this.highestBidderCache.delete(itemId);
        }
    }

    getHighestBidder(itemId: number): number {
        if (this.highestBidderCache.has(itemId)) {
            return this.highestBidderCache.get(itemId)!.userId;
        }
        
        let highestBidAmount = -1;
        let highestBidderId = -1;
        
        const bidsForItem = this.bidsByItem.get(itemId);
        if (!bidsForItem) {
            return -1;
        }
        
        for (const [userId, bidAmount] of bidsForItem.entries()) {
            if (bidAmount > highestBidAmount || 
                (bidAmount === highestBidAmount && userId > highestBidderId)) {
                highestBidAmount = bidAmount;
                highestBidderId = userId;
            }
        }
        
        if (highestBidderId !== -1) {
            this.highestBidderCache.set(itemId, { 
                userId: highestBidderId, 
                bidAmount: highestBidAmount 
            });
        }
        
        return highestBidderId;
    }
}
```