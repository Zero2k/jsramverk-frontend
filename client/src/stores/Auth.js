import { types, flow } from 'mobx-state-tree';

export const AuthStore = types
  .model('AuthStore', {
    authToken: types.maybe(types.string),
    isAuthenticed: false
  })
  .views(self => ({
    get checkAuth() {
      /* Check authToken */
      return true
    }
  }))
  .actions(self => ({
    login: flow(function*() {
      /* Call login */
    }),
    saveToken: flow(function*() {
      /* Store */
    })
  }));
