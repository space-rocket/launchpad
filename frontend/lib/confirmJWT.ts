import fetch from 'isomorphic-fetch';

export function confirmJWT(token) {
  console.log('token 🐱💥', token)
  const backend_url = process.env.API_URL + '/api/confirm-account';

  return fetch(`${backend_url}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
}