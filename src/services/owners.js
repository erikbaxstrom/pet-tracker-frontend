const BASE_URL = 'https://alch-pet-tracker.herokuapp.com';

export async function addOwner(petId, email) {
  const resp = await fetch(`${BASE_URL}/api/v1/pets/${petId}/owners`, {
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
  const resp = await fetch(`${BASE_URL}/api/v1/pets/${petId}/owners`, {
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
  console.log('petId', petId);
  console.log('user_id', user_id);
  const resp = await fetch(`${BASE_URL}/api/v1/pets/${petId}/owners`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ user_id: user_id }),
    credentials: 'include',
  });
  console.log('here i am', resp);
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}
