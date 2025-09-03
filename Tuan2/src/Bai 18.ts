// B18 - fetchUser
export async function task18FetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `User${id}` }), 1000)
  );
}

task18FetchUser(1).then(console.log);
