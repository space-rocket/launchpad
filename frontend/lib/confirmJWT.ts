import fetch from 'isomorphic-fetch';

export async function confirmJWT(token) {
  console.log('token 🐱💥', token)
  const backend_url = process.env.API_URL + '/api/confirm-account';

  let response = await fetch(`${backend_url}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });
  let data = await response.json();
  return data;

  // return fetch(`${backend_url}`, {
  //   headers: {
  //     'content-type': 'application/json',
  //     'Authorization': 'Bearer ' + token,
  //   }
  // })
}