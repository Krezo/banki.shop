import Vuex, { StoreOptions } from 'vuex';
import { Actions, Getters, Mutations, PictureActionType, pictureStore } from './store/pictureStore';
import Vue from 'vue';
import { StoreHelper } from '@/shared/utils/StoreHelper';
import { RootState } from '../shared/types/rootState';

Vue.use(Vuex);

export const storeOption: StoreOptions<RootState> = {
  modules: {
    picture: pictureStore,
  },
};

export const store = new Vuex.Store(storeOption);

const pictureStoreHelper = new StoreHelper<Mutations, Actions, Getters>(store, 'picture');

export { pictureStoreHelper };
