// C26 - Save JSON to file
import { writeFile } from "fs/promises";

export async function task26SaveJsonToFile(data: any, filename: string) {
  await writeFile(filename, JSON.stringify(data, null, 2));
  console.log(`Saved to ${filename}`);
}
