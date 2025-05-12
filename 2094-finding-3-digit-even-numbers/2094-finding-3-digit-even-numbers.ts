const findEvenNumbers = (digits: number[]): number[] => {
  const digitFrequency = new Array(10).fill(0);
  for (const digit of digits) {
    digitFrequency[digit]++;
  }

  const result: number[] = [];

  // Generate all 3-digit numbers with unique combinations from available digits
  for (let hundreds = 1; hundreds <= 9; hundreds++) {
    if (digitFrequency[hundreds] === 0) continue;
    digitFrequency[hundreds]--;

    for (let tens = 0; tens <= 9; tens++) {
      if (digitFrequency[tens] === 0) continue;
      digitFrequency[tens]--;

      for (let units = 0; units <= 8; units += 2) { // only even digits
        if (digitFrequency[units] === 0) continue;
        const number = hundreds * 100 + tens * 10 + units;
        result.push(number);
      }

      digitFrequency[tens]++;
    }

    digitFrequency[hundreds]++;
  }

  // The triple‐nested loops already generate numbers in ascending order
  return result;
};