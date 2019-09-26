import { types, flow } from 'mobx-state-tree';
import decode from 'jwt-decode';

import apiService from '../api/apiService';
import formatError from '../utils/formatError';

export const AuthStore = types
  .model('AuthStore', {
    authToken: types.maybe(types.string),
    isAuthenticed: false
  })
  .views(self => ({
    get checkAuth() {
      return self.isAuthenticed;
    }
  }))
  .actions(self => ({
    login: flow(function*(email, password, remember) {
      try {
        if (email && password) {
          const res = yield apiService.Auth.login(email, password);
          
          if (res.token) {
            self.authToken = res.token;
            self.isAuthenticed = true;
          } else {
            return formatError(res);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }),
    checkToken() {
      try {
        const checkToken = decode(self.authToken);
        if (checkToken.exp < new Date().getTime() / 1000) {
          self.isAuthenticed = false;
          self.isAuthenticed = '';
          throw new Error('Token has expired!');
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    logout() {
      self.authToken = undefined;
      self.isAuthenticed = false;
    }
  }));
