// const BASE_URL = 'http://localhost:7890';
const BASE_URL = 'https://alch-pet-tracker.herokuapp.com';

// export async function getUser() {
//   const resp = await fetch(`${BASE_URL}/api/v1/users/me`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//   });
//   if (resp.ok) {
//     const user = await resp.json();
//     return user;
//   }
// }

export async function signUpUser(email, password) {
  const resp = await fetch(`${BASE_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const data = await resp.json();
  if (resp.ok) {
    // location.replace('/');
    await signInUser(email, password);
  } else {
    console.error(data.message);
  }
}

export async function signInUser(email, password) {
  const resp = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
    mode: 'cors',
  });
  const data = await resp.json();
  localStorage.setItem('token', JSON.stringify(data));
  if (resp.ok) {
    location.replace('/');
  } else {
    console.error(data.message);
    return { error: data.message };
  }
}

export async function signOutUser() {
  const resp = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (resp.ok) {
    location.replace('/auth/sign-in');
  }
}
