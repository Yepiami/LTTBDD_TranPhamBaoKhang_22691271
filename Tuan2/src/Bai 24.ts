// C24 - Fetch multiple users
import { task23FetchUserById } from "./Bai 23";

export async function task24FetchUsers(ids: number[]) {
  return Promise.all(ids.map(task23FetchUserById));
}

task24FetchUsers([1, 2, 3]).then(console.log);
