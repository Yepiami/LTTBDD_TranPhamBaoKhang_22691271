export function task10Finally(): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
    .finally(() => console.log("Done"));
}