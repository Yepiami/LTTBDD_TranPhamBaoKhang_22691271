// B16 - Parallel calls
import { task14MultiplyBy3 } from "./Bai 14";

export async function runTask16() {
  const res = await Promise.all([task14MultiplyBy3(1), task14MultiplyBy3(2), task14MultiplyBy3(3)]);
  console.log(res);
}

runTask16();
