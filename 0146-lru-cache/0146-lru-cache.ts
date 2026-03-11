class Node {
    value: number;
    key: number;
    next: Node | null;
    prev: Node | null;

    constructor(k: number, v: number){
        this.value = v;
        this.key = k;
        this.next = null;
        this.prev = null;
    }
}

class DLL {
    capacity: number;
    head: Node | null;
    tail: Node | null;
    length: number;
    map: Map<number, Node>;

    constructor(c: number){
        this.capacity = c
        this.length = 0
        this.map = new Map()
    }

    add(k: number, v: number){
        if(this.map.has(k)){
            const r = this.get(k);
            this.tail.value = v;
            return r
        }

        const node = new Node(k, v);

        if(this.length === this.capacity) {
            this.setMostRecent(node)
            this.removeLestRecentNode()
        } else {
            if(this.length === 0){
                this.tail = node;
                this.head = node;
            } else {
                this.setMostRecent(node)
            }
        }
        this.map.set(k, node)
        this.length = this.length + 1;
    }

    setMostRecent(n: Node){
        n.prev = this.tail;
        this.tail.next = n;
        this.tail = n;
    }

    removeLestRecentNode(){
        const n = this.head;

        if(this.map.has(n.key)){
            this.map.delete(n.key);
        }

        this.head = this.head.next;
        if(this.head){
            this.head.prev = null;
        }
        
        // Delete
        n.prev = null;
        n.next = null;

        this.length = this.length - 1;
    }

    get(k: number): number {
        if(!this.map.has(k)) return -1
        if(this.length === 1) return this.tail.value;

        const node = this.map.get(k)
        // The first one goes to last
        if(node.key === this.head.key) {
            this.head = this.head.next;
            this.head.prev = null;

            node.prev = this.tail;
            this.tail.next = node;
            node.next = null;
            
            this.tail = node;
        } else if(node.key === this.tail.key) {
            return this.tail.value
        } else {
            const prev = node.prev
            const next = node.next
            // Connect cables in the middle
            prev.next = next
            next.prev = prev

            //Update tail
            node.prev = this.tail
            this.tail.next = node
            node.next = null
            this.tail = node
        }
        
        return node.value
    }
}

class LRUCache {
    DLL: DLL
    constructor(capacity: number) {
        this.DLL = new DLL(capacity)
    }

    get(key: number): number {
        return this.DLL.get(key)
    }

    put(key: number, value: number): void {
        this.DLL.add(key, value)
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */