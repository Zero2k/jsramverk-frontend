import { types, flow } from 'mobx-state-tree';
import apiService from '../api/apiService';
import formatError from '../utils/formatError';

export const AuthStore = types
  .model('AuthStore', {
    authToken: types.maybe(types.string),
    isAuthenticed: false
  })
  .views(self => ({
    get checkAuth() {
      /* Check authToken */
      return self.isAuthenticed;
    }
  }))
  .actions(self => ({
    login: flow(function*(email, password) {
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
      } catch (err) {
        console.log(err);
      }
    }),
    saveToken: flow(function*() {
      /* Store */
    }),
    logout() {
      self.authToken = '';
      self.isAuthenticed = false;
    }
  }));
