import { types } from 'mobx-state-tree';

export const CurrentUserModel = types
  .model('CurrentUserModel', {
    id: types.number,
    username: types.string,
    email: types.string,
    createdAt: types.string,
    birthday: types.string
  })
  .views(self => ({}))
  .actions(self => ({}));
