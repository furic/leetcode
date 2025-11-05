class AVLNode<T> {
    constructor(
        public value: T,
        public height = 1,
        public left: AVLNode<T> | null = null,
        public right: AVLNode<T> | null = null
    ) { }
}

class SortedSet<T> {
    public size = 0;
    private root: AVLNode<T> | null = null;

    constructor(private compare: (a: T, b: T) => number) { }

    private height(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        y.left = x.right;
        x.right = y;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        x.right = y.left;
        y.left = x;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }

    private getBalance(node: AVLNode<T> | null): number {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        if (!node) return new AVLNode(value);

        const cmp = this.compare(value, node.value);
        if (cmp < 0) node.left = this.insertNode(node.left, value);
        else if (cmp > 0) node.right = this.insertNode(node.right, value);
        else return node;

        this.updateHeight(node);
        const balance = this.getBalance(node);

        if (balance > 1 && this.compare(value, node.left!.value) < 0)
            return this.rotateRight(node);
        if (balance < -1 && this.compare(value, node.right!.value) > 0)
            return this.rotateLeft(node);
        if (balance > 1 && this.compare(value, node.left!.value) > 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.compare(value, node.right!.value) < 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    private minValueNode(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }

    private deleteValue(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (!node) return null;

        const cmp = this.compare(value, node.value);
        if (cmp < 0) node.left = this.deleteValue(node.left, value);
        else if (cmp > 0) node.right = this.deleteValue(node.right, value);
        else {
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                const temp = this.minValueNode(node.right!);
                node.value = temp.value;
                node.right = this.deleteValue(node.right, temp.value);
            }
        }

        if (!node) return null;

        this.updateHeight(node);
        const balance = this.getBalance(node);

        if (balance > 1 && this.getBalance(node.left) >= 0)
            return this.rotateRight(node);
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0)
            return this.rotateLeft(node);
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    private searchValue(node: AVLNode<T> | null, value: T): T | null {
        if (!node) return null;
        const cmp = this.compare(value, node.value);
        if (cmp < 0) return this.searchValue(node.left, value);
        if (cmp > 0) return this.searchValue(node.right, value);
        return node.value;
    }

    add(value: T): void {
        this.root = this.insertNode(this.root, value);
        this.size++;
    }

    delete(value: T): void {
        this.root = this.deleteValue(this.root, value);
        this.size--;
    }

    find(value: T): T | null {
        return this.searchValue(this.root, value);
    }

    *values(start?: AVLNode<T>): IterableIterator<T> {
        if (!start) {
            function* inorderAll(node: AVLNode<T> | null): IterableIterator<T> {
                if (node) {
                    yield* inorderAll(node.left);
                    yield node.value;
                    yield* inorderAll(node.right);
                }
            }
            yield* inorderAll(this.root);
            return;
        }

        if (!this.root) return; 

        const targetValue = start.value;
        const stack: AVLNode<T>[] = [];
        let node: AVLNode<T> | null = this.root;

        while (node) {
            const cmp = this.compare(targetValue, node.value);
            if (cmp <= 0) { 
                stack.push(node);
                node = node.left;
            } else {
                node = node.right;
            }
        }
        while (stack.length) {
            const current = stack.pop()!;
            if (this.compare(current.value, targetValue) >= 0) {
                yield current.value;
            }
            let r = current.right;
            while (r) {
                stack.push(r);
                r = r.left;
            }
        }
    }

    lowerBound(value: T): AVLNode<T> | null {
        let current = this.root;
        let result: AVLNode<T> | null = null;

        while (current) {
            const cmp = this.compare(value, current.value);
            if (cmp < 0) {
                result = current;
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return result;
    }

    first(): T | null {
        if (!this.root) return null;
        let node = this.root;
        while (node.left) node = node.left;
        return node.value;
    }

    last(): T | null {
        if (!this.root) return null;
        let node = this.root;
        while (node.right) node = node.right;
        return node.value;
    }
}

class SortedSetWithSum extends SortedSet<number[]> {
    sum = 0
    add([num, freq]: number[]) {
        super.add([num, freq]);
        this.sum += num * freq;
    }
    delete([num, freq]: number[]) {
        super.delete([num, freq]);
        this.sum -= num * freq;
    }
}

function findXSum(a: number[], k: number, x: number): number[] {
    
    const cmp = ([n1, f1]: number[], [n2, f2]: number[]) => {
        if (f1 !== f2) {
            return f1 - f2;
        }
        return n1 - n2;
    };
    const topx = new SortedSetWithSum(cmp);
    const rest = new SortedSetWithSum(cmp);
    const fr = new Map<number, number>();

    function insert(n: number) {
        const currentFreq = fr.get(n) ?? 0;
        fr.set(n, currentFreq + 1);

        if(currentFreq) {
            const item = [n, currentFreq];
            if (topx.find(item)) {
                topx.delete(item);
                item[1]++;
                topx.add(item);
            } else {
                rest.delete(item);
                item[1]++;
                rest.add(item);
            }
        } else {
            if (topx.size < x) {
                topx.add([n, 1]);
            } else {
                rest.add([n, 1]);
            }
        }
        
        maybeSwap()
    }

    function maybeSwap() {
        if (topx.size === x && rest.size > 0) {
            const topxMin = topx.first()!;
            const restMax = rest.last()!;
            if (cmp(topxMin, restMax) < 0) {
                topx.delete(topxMin);
                rest.delete(restMax);
                topx.add(restMax);
                rest.add(topxMin);
            }
        }
    }

    function remove(n: number) {
        const currentFreq = fr.get(n) ?? 0;
        fr.set(n, currentFreq - 1);
        const item = [n, currentFreq];
        if (topx.find(item)) {
            topx.delete(item);
            item[1]--;
            if(item[1]) {
                topx.add(item);
            } else {
                
                if(rest.size) {
                    const restMax = rest.last()!;
                    rest.delete(restMax);
                    topx.add(restMax);
                }
            }
        } else {
            rest.delete(item);
            item[1]--;
            if(item[1]) {
                rest.add(item);
            }
        }
        maybeSwap()
    }

    const result: number[] = [];
    for(let i = 0; i < a.length; i++) {
        if(i >= k) {
            remove(a[i - k]);
        }
        insert(a[i]);
        if(i >= k - 1) {
            result.push(topx.sum);
        }
    }
    return result;
};