const memo = new Map<number, number>([
  [1, 1],
  [2, 2],
]);

function climbStairs(n: number): number {
  if (memo.has(n)) {
    return memo.get(n)!;
  }
  const result = climbStairs(n - 1) + climbStairs(n - 2);
  memo.set(n, result);
  return result;
}
