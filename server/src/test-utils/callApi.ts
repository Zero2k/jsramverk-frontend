import * as request from 'supertest';
import app from '../app';

const BASE_URL = '/api/v1/';

const post = async (url: string, body: any, token: any = null) => {
  const httpRequest = await request(app)
    .post(`${BASE_URL}${url}`)
    .set('Accept', 'application/json')
    .set({ Authorization: token })
    .send(body);
  return httpRequest;
};

const get = async (url: string, token: any = null) => {
  const httpRequest = await request(app)
    .get(`${BASE_URL}${url}`)
    .set('Accept', 'application/json')
    .set({ Authorization: token });
  return httpRequest;
};

const put = async (url: string, body: any, token: any = null) => {
  const httpRequest = await request(app)
    .put(`${BASE_URL}${url}`)
    .set('Accept', 'application/json')
    .set({ Authorization: token })
    .send(body);
  return httpRequest;
};

const del = async (url: string, token: any = null) => {
  const httpRequest = await request(app)
    .del(`${BASE_URL}${url}`)
    .set('Accept', 'application/json')
    .set({ Authorization: token });
  return httpRequest;
};

export { post, get, put, del };
