import { Module } from 'vuex';
import { RootState } from '@/shared/types/rootState';
import { Cart } from '@/domain/entities/Cart';
import { CartService } from '@/application/services/CartService';
import { CartItemType } from '@/domain/interfaces/ICartItem';
import { LocaleCartRepository } from '../../application/repository/LocaleCartRepository';
import { CartItem } from '../../domain/entities/CartItem';

// State interface
export interface CartState {
  items: Cart['items'];
  loading: boolean;
  error: string | null;
}

// Mutation types
export enum CartMutationType {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM'
}

// Action types
export enum CartActionType {
  FETCH_CART = 'FETCH_CART',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART'
}

// Getter types
export enum CartGetterType {
  IS_LOADING = 'isLoading',
  GET_ERROR = 'getError',
  CART_ITEMS = 'cartItems',
  CART_TOTAL = 'cartTotal',
  CART_BOUGHT_IDS = 'CART_BOUGHT_IDS'
}

const cartService = new CartService(new LocaleCartRepository());

// Mutation type definitions
export type Mutations<S = CartState> = {
  [CartMutationType.SET_CART_ITEMS](state: S, payload: Cart['items']): void;
  [CartMutationType.SET_LOADING](state: S, payload: boolean): void;
  [CartMutationType.SET_ERROR](state: S, payload: string | null): void;
  [CartMutationType.ADD_ITEM](state: S, payload: CartItemType): void;
  [CartMutationType.REMOVE_ITEM](state: S, payload: string): void;
};

// Action context type
type ActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

// Action type definitions
export type Actions = {
  [CartActionType.FETCH_CART](context: ActionContext): Promise<void>;
  [CartActionType.ADD_TO_CART](context: ActionContext, item: CartItemType): Promise<void>;
  // [CartActionType.REMOVE_FROM_CART](context: ActionContext, itemId: string): Promise<void>;
};

// Getter type definitions
export interface Getters {
  [CartGetterType.IS_LOADING](state: CartState): boolean;
  [CartGetterType.GET_ERROR](state: CartState): string | null;
  [CartGetterType.CART_ITEMS](state: CartState): Cart['items'];
  [CartGetterType.CART_TOTAL](state: CartState): number;
  [CartGetterType.CART_BOUGHT_IDS](state: CartState): CartItem['id'][];
}

// Vuex module definition
export const cartStore: Module<CartState, RootState> & {
  mutations: Mutations;
  actions: Actions;
  getters: Getters;
} = {
  namespaced: true,

  state: {
    items: [],
    loading: false,
    error: null
  },

  mutations: {
    [CartMutationType.SET_CART_ITEMS](state, items: Cart['items']) {
      state.items = items
    },
    [CartMutationType.SET_LOADING](state, loading: boolean) {
      state.loading = loading;
    },
    [CartMutationType.SET_ERROR](state, error: string | null) {
      state.error = error;
    },
    [CartMutationType.ADD_ITEM](state, item: CartItemType) {
      const cart = new Cart();
      cart.addItem(item);
    },
  },

  actions: {
    async [CartActionType.FETCH_CART]({ commit }) {
      commit(CartMutationType.SET_LOADING, true);
      try {
        const cart = await cartService.getCart();
        commit(CartMutationType.SET_CART_ITEMS, cart.getItems());
      } catch (error) {
        commit(CartMutationType.SET_ERROR, 'Failed load cart');
        throw error;
      }
      finally {
        commit(CartMutationType.SET_LOADING, false);
      }
    },

    async [CartActionType.ADD_TO_CART]({ commit }, item: CartItemType) {
      await cartService.addToCart(item, 1);
      commit(CartMutationType.SET_CART_ITEMS, (await cartService.getCart()).getItems());
    },

    // async [CartActionType.REMOVE_FROM_CART]({ commit }, item: CartItemType) {
    //   commit(CartMutationType.SET_LOADING, true);
    //   try {
    //     await cartService.removeFromCart(item);
    //     commit(CartMutationType.REMOVE_ITEM, item);
    //   } catch (error) {
    //     commit(CartMutationType.SET_ERROR, 'Failed to remove item from cart');
    //   } finally {
    //     commit(CartMutationType.SET_LOADING, false);
    //   }
    // }
  },

  getters: {
    [CartGetterType.IS_LOADING]: (state) => state.loading,
    [CartGetterType.GET_ERROR]: (state) => state.error,
    [CartGetterType.CART_ITEMS]: (state) => state.items,
    [CartGetterType.CART_TOTAL]: (state) => {
      let total = 0;
      state.items.forEach(item => {
        total += item.getTotal();
      });
      return total;
    },
    [CartGetterType.CART_BOUGHT_IDS]: (state) => state.items.map(i => i.item.id)
  }
};