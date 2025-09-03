export function task4RandomPromise(): Promise<number> {
  return new Promise((resolve) => resolve(Math.random()));
}