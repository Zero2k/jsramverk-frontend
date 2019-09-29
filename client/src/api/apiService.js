import wretch from 'wretch';

const API_ROOT = 'http://localhost:4000/api/v1';

const externalApi = wretch()
  // Set the base url
  .url(API_ROOT);

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
};

const Auth = {
  login: async (email, password) =>
    requests.post('/users/login', { email, password }),
  signUp: async (username, email, password, date) =>
    requests.post('/users/signup', { username, email, password, date }),
  me: async token => requests.post('/users/me', null, token)
};

const Report = {
  getReport: async (id, token) => requests.get(`/reports/${id}`, token),
  getReports: async token => requests.get('/reports/list', token),
  updateReport: async (report, token) =>
    requests.put('/reports/update', report, token),
  createReport: async (report, token) =>
    requests.post('/reports/create', report, token),
  deleteReport: async (id, token) =>
    requests.del(`/reports/delete/${id}`, token)
};

export default {
  Auth,
  Report
};

window.apiService = Auth;
