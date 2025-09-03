// B13 - try/catch async
export function task13GetError(): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Something went wrong")), 1000)
  );
}

async function runTask13() {
  try {
    await task13GetError();
  } catch (err) {
    console.error("Caught:", err);
  }
}

runTask13();
