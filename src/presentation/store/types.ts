import { Getter } from 'vuex';

export type StoreModule<S, R, G extends Record<string, (...args: any) => any>> = {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: { [K in keyof G]: ReturnType<G[K]> };
};
