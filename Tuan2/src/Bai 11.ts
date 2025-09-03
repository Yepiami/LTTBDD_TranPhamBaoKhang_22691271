// B11 - async/await Hello Async
export async function task11HelloAsync() {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("Hello Async"), 2000)
  );
}

task11HelloAsync().then(console.log);
