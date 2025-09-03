import { task1Promise } from "./Bai1";
import { task2GetNumber } from "./Bai 2";
import { task3GetError } from "./Bai 3";
import { task4RandomPromise } from "./Bai 4";
import { task5SimulateTask } from "./Bai 5";
import { task6SimulateTask } from "./Bai 6";
import { task7SimulateTask } from "./Bai 7";
import { task8PromiseChain } from "./Bai 8";
import { task9FilterEven } from "./Bai 9";
import { task10Finally } from "./Bai 10";

import { task11HelloAsync } from "./Bai 11";
import { task12SimulateTask } from "./Bai 12";
import { task13GetError } from "./Bai 13";
import { task14MultiplyBy3 } from "./Bai 14";
import { runTask15 } from "./Bai 15";
import { runTask16 } from "./Bai 16";
import { runTask17 } from "./Bai 17";
import { task18FetchUser } from "./Bai 18";
import { task19FetchUsers } from "./Bai 19";
import { task20FetchWithTimeout} from "./Bai 20";

import { task21FetchTodo } from "./Bai 21";
import { task22FetchWithError } from "./Bai 22"; 
import { task23FetchUserById } from "./Bai 23";
import { task24FetchUsers } from "./Bai 24";
import { task25FetchPosts } from "./Bai 25";
import { task26SaveJsonToFile} from "./Bai 26";
import { task27ReadJsonFromFile } from "./Bai 27";
import { task28BatchProcess } from "./Bai 28";
import { task29SimulateTask } from "./Bai 29";
import { task30Retry} from "./Bai 30";

// Hàm chạy test
async function runAll() {
  console.log("=== A. Promises ===");
  console.log(await task1Promise());
  console.log(await task2GetNumber());
  try {
    await task3GetError();
  } catch (e) {
    console.error(e);
  }
  console.log(await task4RandomPromise());
  console.log(await task5SimulateTask(500));
  console.log(await task6SimulateTask(500));
  console.log(await task7SimulateTask(500));
  console.log(await task8PromiseChain());
  console.log(await task9FilterEven([1, 2, 3, 4, 5, 6]));
  await task10Finally();

  console.log("=== B. Async/Await ===");
  console.log(await task11HelloAsync());
  console.log(await task12SimulateTask(2000));
  try {
    await task13GetError();
  } catch (e) {
    console.error(e);
  }
  console.log(await task14MultiplyBy3(3));
  console.log(await runTask15());
  console.log(await runTask16());
  await runTask17();
  console.log(await task18FetchUser(1));
  console.log(await task19FetchUsers([1, 2, 3]));
  try {
    await task20FetchWithTimeout(200);
  } catch (e) {
    console.error(e);
  }

  console.log("=== C. Fetch & I/O ===");
  console.log(await task21FetchTodo());
  await task22FetchWithError();
  console.log(await task23FetchUserById(1));
  console.log(await task24FetchUsers([1, 2, 3]));
  await task25FetchPosts(1);
  await task26SaveJsonToFile({ test: "data" }, "test.json");
  await task27ReadJsonFromFile("test.json");
  await task28BatchProcess([1000, 500]);
  await task29SimulateTask(100);
  await task30Retry(  async () => {
      if (Math.random() < 0.7) throw new Error("Random fail");
}

  );
}
runAll();
