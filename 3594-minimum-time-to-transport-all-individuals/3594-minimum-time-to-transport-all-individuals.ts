const minTime = (
  n: number,
  maxBoatCapacity: number,
  stageCount: number,
  crossingTimes: number[],
  stageMultipliers: number[]
): number => {
  const totalMasks = 1 << n;
  const allPeopleMask = totalMasks - 1;

  // Precompute population count (number of people in subset)
  const popCount = new Array(totalMasks).fill(0);
  for (let mask = 0; mask < totalMasks; mask++) {
    let x = mask, cnt = 0;
    while (x) {
      cnt++;
      x &= x - 1;
    }
    popCount[mask] = cnt;
  }

  // Precompute max crossing time for each subset mask
  const maxTimeForSubset = new Array(totalMasks).fill(0);
  for (let mask = 0; mask < totalMasks; mask++) {
    let maxTime = 0;
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0 && crossingTimes[i] > maxTime) {
        maxTime = crossingTimes[i];
      }
    }
    maxTimeForSubset[mask] = maxTime;
  }

  // Precompute subsets of a base mask with size between 1 and maxBoatCapacity
  const validSubsets = new Array(totalMasks);
  for (let baseMask = 0; baseMask < totalMasks; baseMask++) {
    const subsetList: number[] = [];
    let subset = baseMask;
    while (subset > 0) {
      if (popCount[subset] >= 1 && popCount[subset] <= maxBoatCapacity) {
        subsetList.push(subset);
      }
      subset = (subset - 1) & baseMask;
    }
    validSubsets[baseMask] = subsetList;
  }

  // dist[peopleAtBase][stage][side] = minimal time to reach this state
  // side: 0 = boat at base, 1 = boat at destination
  const dist: number[][][] = new Array(totalMasks);
  for (let mask = 0; mask < totalMasks; mask++) {
    dist[mask] = new Array(stageCount);
    for (let stage = 0; stage < stageCount; stage++) {
      dist[mask][stage] = [Infinity, Infinity];
    }
  }

  type State = {
    time: number;
    peopleAtBase: number;
    stage: number;
    boatSide: 0 | 1;
  };

  // Min-heap stored as array, sorted by time ascending
  const heap: State[] = [];

  const pushHeap = (item: State): void => {
    heap.push(item);
    let idx = heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
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
        } else {
          break;
        }
      }
    }
    return top;
  };

  // Initial state: everyone at base, stage 0, boat at base
  dist[allPeopleMask][0][0] = 0;
  pushHeap({ time: 0, peopleAtBase: allPeopleMask, stage: 0, boatSide: 0 });

  while (heap.length > 0) {
    const { time: currentTime, peopleAtBase, stage, boatSide } = popHeap();

    if (currentTime !== dist[peopleAtBase][stage][boatSide]) continue;

    // All people moved to destination and boat is there
    if (peopleAtBase === 0 && boatSide === 1) return currentTime;

    if (boatSide === 0) {
      // Boat at base camp: send a group across
      const availablePeople = peopleAtBase;
      if (availablePeople === 0) continue;

      const subsets = validSubsets[availablePeople];
      for (const group of subsets) {
        const newPeopleAtBase = peopleAtBase & ~group;
        const crossingTime = maxTimeForSubset[group] * stageMultipliers[stage];
        const nextStage = (stage + Math.floor(crossingTime)) % stageCount;
        const newTime = currentTime + crossingTime;

        if (newTime < dist[newPeopleAtBase][nextStage][1]) {
          dist[newPeopleAtBase][nextStage][1] = newTime;
          pushHeap({ time: newTime, peopleAtBase: newPeopleAtBase, stage: nextStage, boatSide: 1 });
        }
      }
    } else {
      // Boat at destination: one person returns to base
      const peopleAtDestination = (~peopleAtBase) & allPeopleMask;
      for (let i = 0; i < n; i++) {
        if ((peopleAtDestination & (1 << i)) !== 0) {
          const newPeopleAtBase = peopleAtBase | (1 << i);
          const returnTime = crossingTimes[i] * stageMultipliers[stage];
          const nextStage = (stage + Math.floor(returnTime)) % stageCount;
          const newTime = currentTime + returnTime;

          if (newTime < dist[newPeopleAtBase][nextStage][0]) {
            dist[newPeopleAtBase][nextStage][0] = newTime;
            pushHeap({ time: newTime, peopleAtBase: newPeopleAtBase, stage: nextStage, boatSide: 0 });
          }
        }
      }
    }
  }

  return -1;
};