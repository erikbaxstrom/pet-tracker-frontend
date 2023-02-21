const BASE_URL = 'http://localhost:7890';

export async function addPet(name, breed, emergency_contact, vet, notes) {
  const resp = await fetch(`${BASE_URL}/api/v1/pets`, {
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
