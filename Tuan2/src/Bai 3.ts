// A03 - Reject Promise
export function task3GetError(): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Something went wrong")), 1000)
  );
}

task3GetError().catch(console.error);
