// C22 - Fetch error handling
export async function task22FetchWithError() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/invalid-url");
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Caught:", err);
  }
}

task22FetchWithError();
