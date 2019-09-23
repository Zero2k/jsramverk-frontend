import wretch from "wretch";

const API_ROOT = 'http://localhost:4000/api/v1';

const externalApi = wretch()
  // Set the base url
  .url(API_ROOT)

const requests = {
  del: (url, token = null) =>
    externalApi
    .auth(token)
    .url(url)
    .delete()
    .json(),
  get: (url, token = null) =>
    externalApi
    .auth(token)
    .url(url)
    .get()
    .json(),
  put: (url, body, token = null) =>
    externalApi
    .auth(token)
    .url(url)
    .put(body),
  post: (url, body, token = null) =>
    externalApi
    .auth(token)
    .url(url)
    .post(body)
    .json()
}

const Auth = {
  login: async (email, password) =>
    requests.post('/users/login', { email, password })
};

export default {
  Auth
};

window.apiService = Auth;
