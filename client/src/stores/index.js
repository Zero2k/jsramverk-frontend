import { AuthStore } from './Auth';
import { ReportStore } from './Report';

const authStore = AuthStore.create();
const reportStore = ReportStore.create();;

export const stores = {
  authStore,
  reportStore
};

window.MobxStore = stores;
