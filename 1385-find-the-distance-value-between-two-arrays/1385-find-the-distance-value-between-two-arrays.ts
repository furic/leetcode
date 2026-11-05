function findTheDistanceValue(
  arr1: number[],
  arr2: number[],
  d: number,
): number {
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    const ele1 = arr1[i];
    let isValid = true;
    for (let j = 0; j < arr2.length; j++) {
      const ele2 = arr2[j];
      if (Math.abs(ele1 - ele2) <= d) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      count++;
    }
  }

  return count;
}