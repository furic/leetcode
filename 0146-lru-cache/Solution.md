# Doubly Linked List + HashMap | 70 Lines | O(1) | 88ms

# Intuition
LRU cache needs two things in O(1): fast key lookup and fast reordering by recency. A `HashMap` gives O(1) lookup; a doubly linked list gives O(1) node removal and insertion anywhere. Together they form the classic LRU backbone.

# Approach
- **Data structure:** A doubly linked list where `head` = least recently used and `tail` = most recently used, backed by a `Map<number, Node>` for O(1) key-to-node access.
- **`get(key)`:**
  - If key is missing, return `-1`.
  - If already at tail (MRU), return its value immediately — no reordering needed.
  - Otherwise, detach the node from its current position (patch its neighbours) and promote it to tail via `promoteToTail`.
  - Return the value.
- **`put(key, value)`:**
  - If key already exists: reuse `get` to promote it to tail (making it MRU), then overwrite `tail.value`.
  - If key is new: create a node and append to tail. If at capacity *before* inserting, evict the LRU head node (`evictLRU`) and decrement length first, then insert and increment.
- **`promoteToTail(node)`:** Wires the node as the new tail — sets `node.prev = tail`, updates old tail's `next`, and moves `tail` pointer.
- **`evictLRU()`:** Removes `head`, deletes its key from the map, advances `head` to the next node, and cleans up pointers.
- **Edge cases handled:**
  - `length === 1`: single node is both head and tail, no relinking needed.
  - Node is already the tail: skip relinking entirely.
  - Node is the head: advance head before promoting.

# Complexity
- Time complexity: $$O(1)$$ for both `get` and `put` — all operations are pointer rewiring and hashmap lookups.

- Space complexity: $$O(c)$$ where $$c$$ is the cache capacity — at most `capacity` nodes in the list and map.

# Code
```typescript []
class Node {
    key: number;
    value: number;
    prev: Node | null = null;
    next: Node | null = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

class LRUList {
    private readonly capacity: number;
    private length: number = 0;
    private head: Node | null = null;
    private tail: Node | null = null;
    private readonly nodeMap: Map<number, Node> = new Map();

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: number): number {
        if (!this.nodeMap.has(key)) return -1;
        if (this.length === 1) return this.tail!.value;

        const node = this.nodeMap.get(key)!;

        if (node === this.head) {
            this.head = this.head.next!;
            this.head.prev = null;
        } else if (node === this.tail) {
            return this.tail.value;
        } else {
            node.prev!.next = node.next;
            node.next!.prev = node.prev;
        }

        this.promoteToTail(node);
        return node.value;
    }

    add(key: number, value: number): void {
        if (this.nodeMap.has(key)) {
            this.get(key);
            this.tail!.value = value;
            return;
        }

        const node = new Node(key, value);

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.promoteToTail(node);
            if (this.length === this.capacity) this.evictLRU();
        }

        this.nodeMap.set(key, node);
        this.length++;
    }

    private promoteToTail(node: Node): void {
        node.prev = this.tail;
        node.next = null;
        this.tail!.next = node;
        this.tail = node;
    }

    private evictLRU(): void {
        const lruNode = this.head!;
        this.nodeMap.delete(lruNode.key);
        this.head = lruNode.next;
        if (this.head) this.head.prev = null;
        lruNode.prev = null;
        lruNode.next = null;
        this.length--;
    }
}

class LRUCache {
    private readonly list: LRUList;

    constructor(capacity: number) {
        this.list = new LRUList(capacity);
    }

    get(key: number): number {
        return this.list.get(key);
    }

    put(key: number, value: number): void {
        this.list.add(key, value);
    }
}
```