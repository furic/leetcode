const minTime = (
  n: number,
  maxBoatCapacity: number,
  stagesCount: number,
  crossingTimes: number[],
  speedMultipliers: number[]
): number => {
  const totalStates = 1 << n;
  const fullMask = totalStates - 1;

  // Precompute population count for all masks (number of people in subset)
  const popCount = new Array(totalStates).fill(0);
  for (let mask = 0; mask < totalStates; mask++) {
    let x = mask, count = 0;
    while (x) {
      count++;
      x &= x - 1;
    }
    popCount[mask] = count;
  }

  // Precompute max crossing time for every subset of individuals
  const maxTimeInSubset = new Array(totalStates).fill(0);
  for (let mask = 0; mask < totalStates; mask++) {
    let maxTime = 0;
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0 && crossingTimes[i] > maxTime) {
        maxTime = crossingTimes[i];
      }
    }
    maxTimeInSubset[mask] = maxTime;
  }

  // Precompute valid subsets of a mask with size between 1 and maxBoatCapacity
  const validSubsetsByMask: number[][] = Array.from({ length: totalStates }, () => []);
  for (let baseMask = 0; baseMask < totalStates; baseMask++) {
    let subset = baseMask;
    while (subset > 0) {
      if (popCount[subset] >= 1 && popCount[subset] <= maxBoatCapacity) {
        validSubsetsByMask[baseMask].push(subset);
      }
      subset = (subset - 1) & baseMask;
    }
  }

  // Distance array: dist[peopleAtBaseMask][stage][side] = min time
  // side: 0 = boat at base camp, 1 = boat at destination
  const dist = Array.from({ length: totalStates }, () =>
    Array.from({ length: stagesCount }, () =>
      [Infinity, Infinity]
    )
  );

  type State = {
    time: number;
    peopleAtBase: number;
    stage: number;
    boatSide: 0 | 1;
  };

  // Min-heap implementation for Dijkstra-like processing
  const heap: State[] = [];

  const pushHeap = (state: State) => {
    heap.push(state);
    let idx = heap.length - 1;
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1;
      if (heap[parentIdx].time > heap[idx].time) {
        [heap[parentIdx], heap[idx]] = [heap[idx], heap[parentIdx]];
        idx = parentIdx;
      } else {
        break;
      }
    }
  };

  const popHeap = (): State => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      let idx = 0;
      const len = heap.length;
      while (true) {
        let smallest = idx;
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        if (left < len && heap[left].time < heap[smallest].time) smallest = left;
        if (right < len && heap[right].time < heap[smallest].time) smallest = right;
        if (smallest !== idx) {
          [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
          idx = smallest;
        } else break;
      }
    }
    return top;
  };

  // Initial state: all people at base camp, stage 0, boat at base camp
  dist[fullMask][0][0] = 0;
  pushHeap({ time: 0, peopleAtBase: fullMask, stage: 0, boatSide: 0 });

  while (heap.length > 0) {
    const { time: currentTime, peopleAtBase, stage, boatSide } = popHeap();

    if (currentTime !== dist[peopleAtBase][stage][boatSide]) continue;

    // Goal: all people moved to destination (peopleAtBase == 0), boat at destination (side 1)
    if (peopleAtBase === 0 && boatSide === 1) return currentTime;

    if (boatSide === 0) {
      // Boat is at base camp, send a group to destination
      const availablePeopleMask = peopleAtBase;
      if (availablePeopleMask === 0) continue; // No one to send

      for (const subset of validSubsetsByMask[availablePeopleMask]) {
        const newPeopleAtBase = peopleAtBase & ~subset;
        const crossingTime = maxTimeInSubset[subset] * speedMultipliers[stage];
        const nextStage = (stage + Math.floor(crossingTime)) % stagesCount;
        const newTime = currentTime + crossingTime;

        if (newTime < dist[newPeopleAtBase][nextStage][1]) {
          dist[newPeopleAtBase][nextStage][1] = newTime;
          pushHeap({ time: newTime, peopleAtBase: newPeopleAtBase, stage: nextStage, boatSide: 1 });
        }
      }
    } else {
      // Boat is at destination, one person must return to base camp
      const peopleAtDestination = (~peopleAtBase) & fullMask;
      for (let i = 0; i < n; i++) {
        if ((peopleAtDestination & (1 << i)) !== 0) {
          const newPeopleAtBase = peopleAtBase | (1 << i);
          const returnTime = crossingTimes[i] * speedMultipliers[stage];
          const nextStage = (stage + Math.floor(returnTime)) % stagesCount;
          const newTime = currentTime + returnTime;

          if (newTime < dist[newPeopleAtBase][nextStage][0]) {
            dist[newPeopleAtBase][nextStage][0] = newTime;
            pushHeap({ time: newTime, peopleAtBase: newPeopleAtBase, stage: nextStage, boatSide: 0 });
          }
        }
      }
    }
  }

  // Impossible to get everyone across
  return -1;
};