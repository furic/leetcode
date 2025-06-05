class UnionFind {
  parent: number[];

  constructor() {
    this.parent = Array.from({ length: 26 }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return;
    if (rootX < rootY) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootX] = rootY;
    }
  }
}

const smallestEquivalentString = (s1: string, s2: string, baseStr: string): string => {
  const uf = new UnionFind();

  const toIndex = (c: string) => c.charCodeAt(0) - 97;
  const toChar = (i: number) => String.fromCharCode(i + 97);

  for (let i = 0; i < s1.length; i++) {
    uf.union(toIndex(s1[i]), toIndex(s2[i]));
  }

  return [...baseStr].map(c => toChar(uf.find(toIndex(c)))).join('');
};