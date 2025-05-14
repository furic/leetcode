const lengthAfterTransformations = (s: string, t: number, nums: number[]): number => {
    const MOD = 1e9 + 7;
    const MOD_BIGINT = BigInt(MOD);
  const ALPHABET_SIZE = 26;

  // Count initial character frequencies in `s`
  const initialFrequencies = new Uint32Array(ALPHABET_SIZE);
  for (const char of s) {
    initialFrequencies[char.charCodeAt(0) - 97]++;
  }

  // Build base transition matrix (flattened row-major format)
  const matrixSize = ALPHABET_SIZE * ALPHABET_SIZE;
  const baseMatrix = Array<bigint>(matrixSize).fill(0n);

  for (let src = 0; src < ALPHABET_SIZE; src++) {
    const stepCount = nums[src];
    for (let offset = 1; offset <= stepCount; offset++) {
      const dst = (src + offset) % ALPHABET_SIZE;
      baseMatrix[dst * ALPHABET_SIZE + src] += 1n;
    }
  }

  // Prepare vector and buffers
  let stateVector = Array.from(initialFrequencies, BigInt);
  let transitionMatrix = baseMatrix.slice();
  const nextVector = Array<bigint>(ALPHABET_SIZE).fill(0n);
  const nextMatrix = Array<bigint>(matrixSize).fill(0n);

  // Matrix exponentiation: apply `t` transformations
  let power = BigInt(t);
  while (power > 0n) {
    if (power & 1n) {
      // Multiply current transition matrix with state vector
      for (let row = 0; row < ALPHABET_SIZE; row++) {
        let total = 0n;
        const rowStart = row * ALPHABET_SIZE;
        for (let col = 0; col < ALPHABET_SIZE; col++) {
          total += transitionMatrix[rowStart + col] * stateVector[col];
        }
        nextVector[row] = total % MOD_BIGINT;
      }
      stateVector = nextVector.slice();
    }

    // Square the matrix for the next power
    nextMatrix.fill(0n);
    for (let row = 0; row < ALPHABET_SIZE; row++) {
      const rowStart = row * ALPHABET_SIZE;
      for (let mid = 0; mid < ALPHABET_SIZE; mid++) {
        const multiplier = transitionMatrix[rowStart + mid];
        if (multiplier === 0n) continue;
        const midStart = mid * ALPHABET_SIZE;
        for (let col = 0; col < ALPHABET_SIZE; col++) {
          nextMatrix[rowStart + col] += multiplier * transitionMatrix[midStart + col];
        }
      }
      // Apply modulus to each row
      for (let col = 0; col < ALPHABET_SIZE; col++) {
        nextMatrix[row * ALPHABET_SIZE + col] %= MOD_BIGINT;
      }
    }

    transitionMatrix = nextMatrix.slice();
    power >>= 1n;
  }

  // Sum all final frequencies
  let totalLength = 0n;
  for (const count of stateVector) {
    totalLength += count;
  }

  return Number(totalLength % MOD_BIGINT);
};