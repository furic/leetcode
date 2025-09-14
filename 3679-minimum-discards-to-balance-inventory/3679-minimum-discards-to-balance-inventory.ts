function minArrivalsToDiscard(arrivals: number[], w: number, m: number): number {
  // initialize the frequency map for a sliding window
  const slideMap = new Map();

  // initialize the left and right borders of a sliding window
  let l = 0;
  let r = l;

  // initialize return value
  let discards = 0;

  // move the right pointer
  while (r < arrivals.length) {
    
    // populate the frequency map if its not more than M
    if ((slideMap.get(arrivals[r]) ?? 0) + 1 <= m) { 
        slideMap.set(arrivals[r],(slideMap.get(arrivals[r]) ?? 0) + 1);
    } else { 
        discards++; // otherwise increase discards count
        arrivals[r] = -1; // and "invalidate" the value
    }
    
    // move the left border of window, if we reached the size of it
    if (r - l + 1  >= w) {
        slideMap.set(arrivals[l], slideMap.get(arrivals[l]) - 1);
        l++;     
    }

    // move the right border
    r++;
  }

  return discards;
};