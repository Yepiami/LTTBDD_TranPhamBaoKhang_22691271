// A02 - Promise return 10
export function task2GetNumber(): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(10), 1000));
}

task2GetNumber().then(console.log);
