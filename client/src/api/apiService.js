import wretch from "wretch";

const API_ROOT = 'http://localhost:4000/api/v1';

const externalApi = wretch()
  // Set the base url
  .url(API_ROOT)

const requests = {
  del: url =>
    externalApi
    .url(url)
    .delete()
    .json(),
  get: url =>
    externalApi
    .url(url)
    .get(),
  put: (url, body) =>
    externalApi
    .url(url)
    .put(body),
  post: (url, body) =>
    externalApi
    .url(url)
    .post(body)
    .json()
}

const Auth = {
  login: async (email, password) =>
    requests.post('/users/login', { user: { email, password } })
};

export default {
  Auth
};

window.apiService = Auth;
