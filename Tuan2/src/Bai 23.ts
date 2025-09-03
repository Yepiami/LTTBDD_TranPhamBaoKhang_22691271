// C23 - Fetch user by ID
export async function task23FetchUserById(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
}

task23FetchUserById(1).then(console.log);
