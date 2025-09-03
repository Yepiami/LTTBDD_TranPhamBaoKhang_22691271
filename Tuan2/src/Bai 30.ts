// C30 - Retry logic
export async function task30Retry<T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> {
  let error: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      error = err;
      console.log(`Retrying... (${i + 1})`);
    }
  }
  throw error;
}

// Example: fetch may fail
async function unstableFetch() {
  if (Math.random() < 0.7) throw new Error("Random fail");
  return "Success";
}

task30Retry(unstableFetch, 5).then(console.log).catch(console.error);
