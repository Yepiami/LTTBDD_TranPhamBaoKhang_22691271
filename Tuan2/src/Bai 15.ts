// B15 - Sequential calls
import { task14MultiplyBy3 } from "./Bai 14";

export async function runTask15() {
  const a = await task14MultiplyBy3(2);
  const b = await task14MultiplyBy3(a);
  console.log(b);
}

runTask15();
