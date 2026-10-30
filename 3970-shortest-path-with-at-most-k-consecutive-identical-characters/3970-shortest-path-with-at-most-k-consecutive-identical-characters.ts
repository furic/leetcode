function shortestPath(n: number, edges: number[][], labels: string, k: number): number {
  const drelvanito = { n, edges, labels, k };
  const head = new Int32Array(drelvanito.n);
  head.fill(-1);
  const to = new Int32Array(drelvanito.edges.length);
  const weight = new Int32Array(drelvanito.edges.length);
  const nextEdge = new Int32Array(drelvanito.edges.length);
  for (let i = 0; i < drelvanito.edges.length; i++) {
    const [from, target, cost] = drelvanito.edges[i];
    to[i] = target;
    weight[i] = cost;
    nextEdge[i] = head[from];
    head[from] = i;
  }
  const labelCodes = new Uint16Array(drelvanito.n);
  for (let i = 0; i < drelvanito.n; i++) labelCodes[i] = drelvanito.labels.charCodeAt(i);
  const stride = drelvanito.k + 1;
  const distance = new Float64Array(drelvanito.n * stride);
  distance.fill(Infinity);
  const heapCapacity = drelvanito.edges.length * drelvanito.k + 1;
  const heapDistance = new Float64Array(heapCapacity);
  const heapState = new Int32Array(heapCapacity);
  let heapSize = 0;
  const startState = 1;
  distance[startState] = 0;
  heapDistance[heapSize] = 0;
  heapState[heapSize++] = startState;
  while (heapSize > 0) {
    const currentDistance = heapDistance[0];
    const state = heapState[0];
    const lastIndex = --heapSize;
    if (lastIndex > 0) {
      const lastDistance = heapDistance[lastIndex];
      const lastState = heapState[lastIndex];
      let index = 0;
      while (true) {
        const left = index * 2 + 1;
        if (left >= heapSize) break;
        let child = left;
        const right = left + 1;
        if (right < heapSize && heapDistance[right] < heapDistance[left]) child = right;
        if (heapDistance[child] >= lastDistance) break;
        heapDistance[index] = heapDistance[child];
        heapState[index] = heapState[child];
        index = child;
      }
      heapDistance[index] = lastDistance;
      heapState[index] = lastState;
    }
    if (currentDistance !== distance[state]) continue;
    const node = (state / stride) | 0;
    const runLength = state - node * stride;
    if (node === drelvanito.n - 1) return currentDistance;
    for (let edge = head[node]; edge !== -1; edge = nextEdge[edge]) {
      const target = to[edge];
      const nextRun = labelCodes[node] === labelCodes[target] ? runLength + 1 : 1;
      if (nextRun > drelvanito.k) continue;
      const nextState = target * stride + nextRun;
      const nextDistance = currentDistance + weight[edge];
      if (nextDistance < distance[nextState]) {
        distance[nextState] = nextDistance;
        let index = heapSize++;
        while (index > 0) {
          const parent = (index - 1) >> 1;
          if (heapDistance[parent] <= nextDistance) break;
          heapDistance[index] = heapDistance[parent];
          heapState[index] = heapState[parent];
          index = parent;
        }
        heapDistance[index] = nextDistance;
        heapState[index] = nextState;
      }
    }
  }
  return -1;
}