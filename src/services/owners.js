// const BASE_URL = 'http://localhost:7890';
// const BASE_URL = 'https://alch-pet-tracker.herokuapp.com';
// const BASE_URL = 'https://pet-tracker.netlify.app';

export async function addOwner(petId, email) {
  const resp = await fetch(`/api/v1/pets/${petId}/owners`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

export async function fetchOwners(petId) {
  const resp = await fetch(`/api/v1/pets/${petId}/owners`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
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

export async function deleteOwner(petId, user_id) {
  const resp = await fetch(`/api/v1/pets/${petId}/owners`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ user_id: user_id }),
    credentials: 'include',
  });
  //originally we had const data = resp.json(); here, but because a status code is not valid json, we were inherently getting an error regardless.
  //instead we only want want to await a response if there is an issue?
  if (resp.ok) {
    return;
  } else {
    const data = await resp.json();
    console.error(data.message);
  }
}
