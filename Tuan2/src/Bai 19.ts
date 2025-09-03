// B19 - fetchUsers
import { task18FetchUser } from "./Bai 18";

export async function task19FetchUsers(ids: number[]) {
  return Promise.all(ids.map(task18FetchUser));
}

task19FetchUsers([1, 2, 3]).then(console.log);
