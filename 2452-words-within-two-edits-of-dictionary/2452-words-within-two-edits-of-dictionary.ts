function twoEditWords(queries: string[], dictionary: string[]): string[] {
  const result: string[] = [];

  for (const query of queries) {
    for (const word of dictionary) {
      let diffCount = 0;
      for (let i = 0; i < query.length; i++) {
        if (query[i] !== word[i]) {
          diffCount++;
        }
        if (diffCount > 2) {
          break;
        }
      }
      if (diffCount <= 2) {
        result.push(query);
        break;
      }
    }
  }

  return result;
}