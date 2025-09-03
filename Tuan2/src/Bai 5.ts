// A05 - simulateTask
export function task5SimulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Task done"), time));
}

task5SimulateTask(1500).then(console.log);
