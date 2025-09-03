// C25 - Fetch posts by user
export async function task25FetchPosts(userId: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return res.json();
}

task25FetchPosts(1).then(console.log);
