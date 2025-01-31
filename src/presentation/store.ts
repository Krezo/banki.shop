import Vuex, { StoreOptions } from 'vuex';
import { Actions as PictureActions, Getters as PictureGetters, Mutations as PictureMutations, pictureStore } from './store/pictureStore';
import Vue from 'vue';
import { RootState } from '../shared/types/rootState';
import { StoreHelper } from '../shared/utils/storeHelper';
import { cartStore, Actions as CartActions, Mutations as CartMutations, Getters as CartGetters } from './store/cartStore';

Vue.use(Vuex);

export const storeOption: StoreOptions<RootState> = {
  modules: {
    picture: pictureStore,
    cart: cartStore
  },
};

export const store = new Vuex.Store(storeOption);

const pictureStoreHelper = new StoreHelper<PictureMutations, PictureActions, PictureGetters, 'picture'>(store, 'picture');
const cartStoreHelper = new StoreHelper<CartMutations, CartActions, CartGetters, 'cart'>(store, 'cart');
export { pictureStoreHelper, cartStoreHelper };
