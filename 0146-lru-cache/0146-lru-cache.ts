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