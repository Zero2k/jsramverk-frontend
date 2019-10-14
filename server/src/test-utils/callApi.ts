import * as request from 'supertest';
import app from '../app';

const BASE_URL = '/api/v1/';

const post = (url: string, body: any, token: any = null) => {
  const httpRequest = request(app).post(`${BASE_URL}${url}`);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set({ Authorization: token });
  httpRequest.send(body);
  return httpRequest;
};

const get = (url: string, token: any = null) => {
  const httpRequest = request(app).get(`${BASE_URL}${url}`);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set({ Authorization: token });
  return httpRequest;
};

const put = (url: string, body: any, token: any = null) => {
  const httpRequest = request(app).put(`${BASE_URL}${url}`);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set({ Authorization: token });
  httpRequest.send(body);
  return httpRequest;
};

const del = (url: string, token: any = null) => {
  const httpRequest = request(app).del(`${BASE_URL}${url}`);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set({ Authorization: token });
  return httpRequest;
};

export { post, get, put, del };
