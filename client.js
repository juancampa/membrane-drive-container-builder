const apiKey = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);

const baseUrl = `https://cloudbuild.googleapis.com`;

export const PROJECT_ID apiKey.project_id;

let _client;
async function getClient() {
  if (_client === undefined) {
    _client = auth.fromJSON(JSON.parse(SERVICE_ACCOUNT_JSON));
    _client.scopes = ['https://www.googleapis.com/auth/cloud-platform']
    await _client.authorize();
  }
  return _client;
}

async function get(path, params) {
  const client = await getClient();
  const result = client.request({
    url: baseUrl + path,
    method: 'get'
    params,
  })
  return result.data;
}

async function post(path, body, params) {
  const client = await getClient();
  const result = client.request({
    url: baseUrl + path,
    method: 'post'
    body,
    params,
  })
  return result.data;
}

