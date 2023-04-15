// const BASE_URL = 'http://localhost:7890';
// const BASE_URL = 'https://alch-pet-tracker.herokuapp.com';
// const BASE_URL = 'https://pet-tracker.netlify.app';

export async function fetchTasks() {
  const resp = await fetch(`/api/v1/tasks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

export async function addTask(task) {
  const resp = await fetch(`/api/v1/tasks/pet/${task.petId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ description: task.description, time: task.time }),
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

export async function updateTask(task) {
  const resp = await fetch(`/api/v1/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ is_complete: task.is_complete }),
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

export async function deleteTask(taskId) {
  const resp = await fetch(`/api/v1/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}
