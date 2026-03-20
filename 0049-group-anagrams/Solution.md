# Sort and Map | 8 Lines | Beats 81% | O(n×mlogm) | 14ms

## Intuition
The problem asks to group strings that are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. To solve this, we need to identify which strings in the given array can be grouped together based on their letter arrangements.

The key observation is that anagrams have identical sorted character sequences. For example, `"eat"`, `"tea"`, and `"ate"` all have the same sorted character sequence, `"aet"`. We can use this property to classify anagrams.

## Approach
We can solve this problem efficiently by using a `Map` to store the anagram groups. For each string in the input array:
1. We sort the string's characters to create a unique key.
2. We use this key to map the string to a list of anagrams.
3. If a group already exists for the key, we add the string to the group; otherwise, we create a new group.

Finally, the result is the list of values (anagram groups) from the `Map`.

## Complexity
- **Time complexity**:  
  Sorting each string takes $$O(m \log m)$$, where \(m\) is the length of the string. Since there are \(n\) strings, the total time complexity is $$O(n \times m \log m)$$, where \(n\) is the number of strings and \(m\) is the average length of the strings.

- **Space complexity**:  
  The space complexity is $$O(n \times m)$$, as we store all strings in the `Map`, where each string's length is \(m\).

## Code
```typescript
function groupAnagrams(strs: string[]): string[][] {
    const anagramsMap = new Map<string, string[]>();
    strs.forEach((str) => {
        const key = str.split('').sort().join();
        anagramsMap.set(key, [...(anagramsMap.get(key) || []), str]);
    });
    return [...anagramsMap.values()];
};