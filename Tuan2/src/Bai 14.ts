// B14 - multiply by 3
export async function task14MultiplyBy3(num: number): Promise<number> {
  await new Promise((r) => setTimeout(r, 1000));
  return num * 3;
}

task14MultiplyBy3(5).then(console.log);
