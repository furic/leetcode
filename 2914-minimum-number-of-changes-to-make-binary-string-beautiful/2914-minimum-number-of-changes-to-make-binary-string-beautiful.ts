function minChanges(s: string): number {
    return s.match(/../g)!.filter(([a, b]) => a !== b).length;
}