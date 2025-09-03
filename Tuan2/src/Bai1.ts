// A01 - Promise Hello Async
export function task1Promise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
}

// Cách gọi thử:
task1Promise().then(console.log);
