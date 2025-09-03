export function task9FilterEven(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => setTimeout(() => resolve(arr.filter(x => x % 2 === 0)), 1000));
}