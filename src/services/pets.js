// const BASE_URL = 'http://localhost:7890';
// const BASE_URL = 'https://alch-pet-tracker.herokuapp.com';
// const BASE_URL = 'https://pet-tracker.netlify.app';

export async function addPet(name, breed, emergency_contact, vet, notes) {
  const resp = await fetch(`/api/v1/pets`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, breed, emergency_contact, vet, notes }),
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

export async function fetchPets() {
  const resp = await fetch(`/api/v1/pets`, {
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

export async function fetchPetById(id) {
  const resp = await fetch(`/api/v1/pets/${id}`, {
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
    return { error: data.message };
  }
}

export async function updatePet(id, name, breed, emergency_contact, vet, notes) {
  const resp = await fetch(`/api/v1/pets/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, breed, emergency_contact, vet, notes }),
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    return data;
  } else {
    console.error(data.message);
  }
}

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
    return { error: data.message };
  }
}
