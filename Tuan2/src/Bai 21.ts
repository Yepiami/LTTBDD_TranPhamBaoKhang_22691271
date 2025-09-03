// C21 - Fetch API (JSONPlaceholder)
export async function task21FetchTodo() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log(data);
}

task21FetchTodo();
