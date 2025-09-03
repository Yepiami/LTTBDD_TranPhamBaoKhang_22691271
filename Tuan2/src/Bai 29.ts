// C29 - Race with timeout
export function task29SimulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`Task ${time} done`), time));
}

export async function task29WithTimeout(p: Promise<any>, ms: number) {
  return Promise.race([
    p,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms)),
  ]);
}

task29WithTimeout(task29SimulateTask(2000), 1000).then(console.log).catch(console.error);
