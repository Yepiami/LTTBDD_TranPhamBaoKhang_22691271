// B20 - Timeout
import { task18FetchUser } from "./Bai 18";

export async function task20FetchWithTimeout(id: number) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), 2000);
    task18FetchUser(id).then((res) => {
      clearTimeout(timer);
      resolve(res);
    });
  });
}

task20FetchWithTimeout(1).then(console.log).catch(console.error);
