import { types } from 'mobx-state-tree';

export const ReportModel = types
  .model('ReportModel', {
    id: types.identifier,
    title: types.string,
    text: types.string,
    createdAt: types.string
  })
  .views(self => ({

  }))
  .actions(self => ({

  }));
