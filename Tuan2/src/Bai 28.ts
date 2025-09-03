// C28 - Batch processing (simulateTask)
export function task28SimulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`Task ${time} done`), time));
}

export async function task28BatchProcess(times: number[]) {
  for (const t of times) {
    const res = await task28SimulateTask(t);
    console.log(res);
  }
}

task28BatchProcess([500, 1000, 1500]);
