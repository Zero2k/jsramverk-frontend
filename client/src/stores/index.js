import { AuthStore } from './Auth';

const authStore = AuthStore.create();

export const stores = {
  authStore
};

window.MobxStore = stores;
