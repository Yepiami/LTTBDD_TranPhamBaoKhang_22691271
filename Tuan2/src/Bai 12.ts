// B12 - simulateTask(2000)
export function task12SimulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Task done"), time));
}

async function runTask12() {
  const res = await task12SimulateTask(2000);
  console.log(res);
}

runTask12();
