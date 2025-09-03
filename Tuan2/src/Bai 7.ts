// A07 - Promise.race
export function task7SimulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`Task ${time} done`), time));
}

Promise.race([task7SimulateTask(1000), task7SimulateTask(2000), task7SimulateTask(3000)])
  .then(console.log);
