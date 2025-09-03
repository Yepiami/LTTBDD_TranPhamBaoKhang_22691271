export async function task8PromiseChain(): Promise<number> {
  return Promise.resolve(2).then(x => x * x).then(x => x * 2).then(x => x + 5);
}