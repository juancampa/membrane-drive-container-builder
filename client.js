const { API_TOKEN } = process.env

const client = require('axios').create({
  baseURL: 'https://cloudbuild.googleapis.com/',
  headers: {
    Authorization: 'Bearer ' + API_TOKEN,
  },
})

export async function get(url, params) {
  const result = await client.get(url, { params })
  return result.data
}

export async function post(url, body, params) {
  const result = await client.post(url, body, { params })
  return result
}

export async function put(url, body, params) {
  const result = await client.put(url, body, { params })
  return result
}
