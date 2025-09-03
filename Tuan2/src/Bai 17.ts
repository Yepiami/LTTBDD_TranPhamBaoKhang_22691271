// B17 - for await...of
import { task14MultiplyBy3 } from "./Bai 14";

export async function runTask17() {
  const promises = [1, 2, 3].map(task14MultiplyBy3);
  for await (const result of promises) {
    console.log(result);
  }
}

runTask17();
