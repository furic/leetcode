# State Machine DP | 20 Lines | O(n) | 32ms

# Intuition

When I first look at this problem, I need to understand what we're really being asked to do. We have a corridor with seats and plants, and we need to divide it into sections where each section contains exactly two seats. The dividers can only be placed between elements, and we want to count all the different ways we can make these divisions.

The crucial insight here is recognizing that this is fundamentally a sequential decision-making problem with constraints. As we walk through the corridor from left to right, we're constantly in one of several "states" based on how many seats we've seen in our current section. This naturally suggests using a state machine approach, where we track how many different ways we can reach each state as we process each element.

Think of it this way: imagine you're actually walking down the corridor with a marker, deciding where to draw divider lines. At any point, you need to know whether you're in the middle of building a section that needs two seats, or whether you've just completed a section and could potentially start a new one. This mental model of tracking our "current situation" is exactly what our state machine captures.

# Approach

Let me walk you through how we can model this problem using a state machine, breaking it down into digestible pieces so you can really understand the elegance of this solution.

**Understanding the Three States**

The foundation of our solution rests on carefully defining three distinct states that capture all the meaningful situations we can be in as we process the corridor. These states aren't arbitrary—they precisely correspond to the decisions and constraints we face.

The first state, which I call `completeSections`, represents a situation where we've successfully created zero or more complete sections, and each of those sections contains exactly two seats. When we're in this state, we're essentially "starting fresh" because our previous work is done and validated. This is our target state—when we finish processing the entire corridor, we want to be in this state to have a valid division.

The second state, `incompletePair`, captures the intermediate situation where we've started building a new section and have seen exactly one seat so far. We're committed to this section now—we can't place a divider until we find that second seat. This state represents a kind of "pending" situation where we're waiting for completion.

The third state, `readyForDivider`, is perhaps the most interesting. We enter this state when we've just completed a pair of seats in our current section. Now comes the critical decision: whenever we encounter a plant after completing a pair, we have the option to place a divider there. If we place a divider, we transition to `completeSections`. If we don't place a divider, we stay in `readyForDivider`, waiting for the next element to make another decision.

**How State Transitions Work**

Now let me explain how we move between these states as we process each character in the corridor, because this is where the real magic happens.

When we encounter a seat, something interesting occurs with our state machine. Adding a seat changes our position in the "pair-building" process. If we're in `completeSections`, adding a seat means we're starting a new section with one seat, so we transition to `incompletePair`. If we're in `incompletePair`, adding a second seat completes our pair, transitioning us to `readyForDivider`. The code uses a clever swapping mechanism to handle this alternating behavior elegantly.

Here's where it gets subtle: when we see a seat and we were in `readyForDivider`, what happens? Well, if we haven't placed a divider after our last complete pair, adding another seat would mean our section now has three seats, which violates the constraint. But the state machine handles this correctly through the swap operation. The value that was in `readyForDivider` moves to `incompletePair`, representing the ways where we didn't place a divider and now we're starting to count seats in what would be an invalid section. However, the value in `completeSections` gets updated to reflect only valid complete sections.

When we encounter a plant, we're at a potential divider location. The key insight is that plants give us choices. If we're in the `readyForDivider` state, we can choose to place a divider here, which would transition us to the `completeSections` state. The way we capture this mathematically is by adding the current `completeSections` count to `readyForDivider`. This represents combining two possibilities: all the ways we could have reached `readyForDivider` without placing a divider here, plus all the ways we could have reached `completeSections` and then placed a divider at this plant.

**Counting Ways Implicitly**

What makes this approach so elegant is how it counts combinations without explicitly enumerating them. Instead of trying to list out every possible way to place dividers (which would be exponential in complexity), we maintain counts of how many ways we can reach each state. These counts accumulate as we process elements, with each state transition updating the counts based on the possible ways to reach the new state from the old state.

The initialization is also thoughtful: we start with `readyForDivider = 1`, representing the single way to have processed zero elements (the empty prefix). This might seem odd at first—why is an empty corridor in the "ready for divider" state? The answer is that this initialization sets up the math correctly so that when we process the first element, the transitions work out properly.

**Walking Through an Example**

Let me trace through the example "SSPPSPS" to make this concrete. We start with completeSections=0, incompletePair=0, and readyForDivider=1.

When we see the first 'S', we apply the seat transition. The `completeSections` becomes 0 (taking the value from `incompletePair`), and we swap `incompletePair` with `readyForDivider`, giving us incompletePair=1 and readyForDivider=0. This captures the idea that we now have one way to be in a state with one seat in our current section.

The second 'S' appears, and we apply the seat transition again. Now `completeSections` becomes 1 (taking the value from `incompletePair`), meaning we have one way to have completed our first pair of seats. After the swap, incompletePair=0 and readyForDivider=1, showing we're ready to potentially place a divider after the next plant.

When we encounter the first 'P', we're at a plant, so we update `readyForDivider` to be `1 + 0 = 1`. Wait, that doesn't change anything? Actually, at this point, we don't have any completed sections yet, so there's only one way to continue: don't place a divider and keep going.

The second 'P' is more interesting. Now `readyForDivider` becomes `1 + 0 = 1` again. Hmm, let me reconsider this trace more carefully...

Actually, let me think about what happens after we see 'SS'. We have completeSections=1, incompletePair=0, readyForDivider=1. This means we have one way to have completed a first section with two seats, and we're ready to potentially place a divider. When we see a 'P', we update readyForDivider to be readyForDivider + completeSections = 1 + 1 = 2. This represents two possibilities: we could not place a divider after this P, or we could place a divider here and "commit" to having completed that first section.

As we continue processing more elements, these counts compound based on the decisions we're implicitly making, ultimately giving us the total number of valid ways to divide the corridor.

# Complexity

**Time complexity: O(n)**

We make a single pass through the corridor string, examining each character exactly once. Within each iteration, we perform only constant-time operations: we compare characters, update integer variables, perform modular arithmetic, and potentially swap values. None of these operations depends on the size of the input. Therefore, our time complexity scales linearly with the length of the corridor string. No matter how long the corridor gets, we only need to look at each element once.

**Space complexity: O(1)**

Our solution uses only three integer variables to track the state of our dynamic programming computation, regardless of how large the input becomes. We don't create any arrays, don't use recursion (which would consume stack space), and don't build any data structures that grow with the input. This makes our solution extremely space-efficient. The only space we use beyond the three state variables is for the constant MOD value and loop variables, all of which are O(1).

# Code
```typescript
const numberOfWays = (corridor: string): number => {
    const MOD = 10**9 + 7;
    
    let completeSections = 0;
    let incompletePair = 0;
    let readyForDivider = 1;
    
    for (const element of corridor) {
        if (element === 'S') {
            completeSections = incompletePair;
            [incompletePair, readyForDivider] = [readyForDivider, incompletePair];
        } else {
            readyForDivider = (readyForDivider + completeSections) % MOD;
        }
    }
    
    return completeSections;
};
```