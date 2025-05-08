function minOperations(nums: number[], x: number, k: number): number {
  const n = nums.length;
  const windowCount = n - x + 1;

  class Heap {
    private data: number[] = [];
    private comparator: (a: number, b: number) => number;
    private lazy = new Map<number, number>();
    private _size = 0;
    public sum = 0;

    constructor(comparator: (a: number, b: number) => number) {
      this.comparator = comparator;
    }

    size = () => this._size;

    push = (val: number) => {
      this.data.push(val);
      this.sum += val;
      this._size++;
      this._siftUp(this.data.length - 1);
    };

    pop = (): number => {
      this._prune();
      if (this.data.length === 0) return null;
      const top = this.data[0];
      this.sum -= top;
      this._size--;
      this._swap(0, this.data.length - 1);
      this.data.pop();
      this._siftDown(0);
      return top;
    };

    peek = (): number => {
      this._prune();
      return this.data.length === 0 ? null : this.data[0];
    };

    remove = (val: number) => {
      this.lazy.set(val, (this.lazy.get(val) || 0) + 1);
      this._size--;
      this.sum -= val;
      this._prune();
    };

    private _prune = () => {
      while (this.data.length > 0) {
        const top = this.data[0];
        if (this.lazy.has(top)) {
          this.lazy.set(top, this.lazy.get(top)! - 1);
          if (this.lazy.get(top) === 0) this.lazy.delete(top);
          this._swap(0, this.data.length - 1);
          this.data.pop();
          this._siftDown(0);
        } else break;
      }
    };

    private _siftUp = (i: number) => {
      let parent = Math.floor((i - 1) / 2);
      while (i > 0 && this.comparator(this.data[i], this.data[parent]) < 0) {
        this._swap(i, parent);
        i = parent;
        parent = Math.floor((i - 1) / 2);
      }
    };

    private _siftDown = (i: number) => {
      const n = this.data.length;
      while (true) {
        const left = 2 * i + 1, right = 2 * i + 2;
        let smallest = i;
        if (left < n && this.comparator(this.data[left], this.data[smallest]) < 0) smallest = left;
        if (right < n && this.comparator(this.data[right], this.data[smallest]) < 0) smallest = right;
        if (smallest !== i) {
          this._swap(i, smallest);
          i = smallest;
        } else break;
      }
    };

    private _swap = (i: number, j: number) => {
      [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    };
  }

  const low = new Heap((a, b) => b - a); // Max-heap
  const high = new Heap((a, b) => a - b); // Min-heap

  const balanceHeaps = () => {
    while (low.size() > high.size() + 1) high.push(low.pop());
    while (low.size() < high.size()) low.push(high.pop());
  };

  const addNum = (num: number) => {
    if (low.size() === 0 || num <= low.peek()) low.push(num);
    else high.push(num);
    balanceHeaps();
  };

  const removeNum = (num: number) => {
    if (num <= low.peek()) low.remove(num);
    else high.remove(num);
    balanceHeaps();
  };

  const getWindowCost = (): number => {
    const median = low.peek();
    const costLeft = median * low.size() - low.sum;
    const costRight = high.sum - median * high.size();
    return costLeft + costRight;
  };

  const windowCosts: number[] = [];

  for (let i = 0; i < x; i++) addNum(nums[i]);
  windowCosts.push(getWindowCost());

  for (let i = x; i < n; i++) {
    removeNum(nums[i - x]);
    addNum(nums[i]);
    windowCosts.push(getWindowCost());
  }

  const dp: number[][] = Array.from({ length: k + 1 }, () =>
    Array(windowCount).fill(Infinity)
  );

  for (let i = 0; i < windowCount; i++) {
    dp[1][i] = windowCosts[i];
  }

  for (let t = 2; t <= k; t++) {
    let best = Infinity;
    for (let i = 0; i < windowCount; i++) {
      if (i - x >= 0) best = Math.min(best, dp[t - 1][i - x]);
      if (best < Infinity) dp[t][i] = best + windowCosts[i];
    }
  }

  return Math.min(...dp[k]);
}