const BASE_URL = 'https://alch-pet-tracker.herokuapp.com';

export async function fetchTasks() {
  const resp = await fetch(`${BASE_URL}/api/v1/tasks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    console.log('data!!', data);
    return data;
  } else {
    console.error(data.message);
  }
}
