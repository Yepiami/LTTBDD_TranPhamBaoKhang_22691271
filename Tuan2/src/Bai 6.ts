// A06 - Promise.all
export function task6SimulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`Task ${time} done`), time));
}

Promise.all([task6SimulateTask(1000), task6SimulateTask(2000), task6SimulateTask(3000)])
  .then(console.log);
