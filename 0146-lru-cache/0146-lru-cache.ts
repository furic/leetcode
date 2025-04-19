class DoublyLinkedNode {
    key: number;
    value: number;
    prev: DoublyLinkedNode | null;
    next: DoublyLinkedNode | null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    private capacity: number;
    private cache: Map<number, DoublyLinkedNode>;
    private head: DoublyLinkedNode;
    private tail: DoublyLinkedNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();

        this.head = new DoublyLinkedNode(0, 0);
        this.tail = new DoublyLinkedNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        if (!this.cache.has(key)) return -1;

        const node = this.cache.get(key)!;
        this.moveToHead(node);
        return node.value;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            node.value = value;
            this.moveToHead(node);
        } else {
            const newNode = new DoublyLinkedNode(key, value);
            this.cache.set(key, newNode);
            this.addToHead(newNode);

            if (this.cache.size > this.capacity) {
                this.removeLRU();
            }
        }
    }

    private addToHead(node: DoublyLinkedNode): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    private moveToHead(node: DoublyLinkedNode): void {
        this.removeNode(node);
        this.addToHead(node);
    }

    private removeNode(node: DoublyLinkedNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    private removeLRU(): void {
        const lruNode = this.tail.prev!;
        this.removeNode(lruNode);
        this.cache.delete(lruNode.key);
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */