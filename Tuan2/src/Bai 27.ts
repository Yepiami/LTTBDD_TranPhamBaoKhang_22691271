// C27 - Read JSON from file
import { readFile } from "fs/promises";

export async function task27ReadJsonFromFile(filename: string) {
  const content = await readFile(filename, "utf-8");
  return JSON.parse(content);
}
