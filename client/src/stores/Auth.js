import { types, flow } from 'mobx-state-tree';
import apiService from '../api/apiService'

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
          const res = yield apiService.Auth.login(email, password)
          console.log('Store', res);
        }
      } catch (e) {
        return e;
      }
    }),
    saveToken: flow(function*() {
      /* Store */
    })
  }));
