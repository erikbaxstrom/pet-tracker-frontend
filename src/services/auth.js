import { signInUser, signOutUser, signUpUser } from '../fetch-utils.js';
// import { client } from './client';

// export function getUser() {
//   return client.auth.currentUser;
// }

const BASE_URL = 'http://localhost:7890';

export async function getUser() {
  const resp = await fetch(`${BASE_URL}/api/v1/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (resp.ok) {
    const user = await resp.json();
    return user;
  }
}

export async function authUser(email, password, type) {
  let response;
  if (type === 'sign-up') {
    // response = await client.auth.signUp({ email, password });
    response = await signUpUser(email, password);
  } else {
    // response = await client.auth.signIn({ email, password });
    response = await signInUser(email, password);
  }
  if (response.error) {
    throw response.error;
  }
  return response.user;
}

export async function signOut() {
  await signOutUser();
}
