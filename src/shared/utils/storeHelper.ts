import { Store } from 'vuex';
import { RootState } from '../types/rootState';

export class StoreHelper<
  M extends Record<string, any>,
  A extends Record<string, any>,
  G extends Record<string, any>,
  K extends keyof RootState
> {
  constructor(private store: Store<RootState>, private namespace: K) { }

  public get state() {
    return this.store.state[this.namespace];
  }


  commit<T extends keyof M>(type: T, payload: Parameters<M[T]>[1]): void {
    this.store.commit(`${this.namespace}/${String(type)}`, payload);
  }

  dispatch<T extends keyof A>(type: T, payload?: Parameters<A[T]>[1]): ReturnType<A[T]> {
    return this.store.dispatch(`${this.namespace}/${String(type)}`, payload) as ReturnType<A[T]>;
  }

  getter<T extends keyof G>(type: T): ReturnType<G[T]> {
    return this.store.getters[`${this.namespace}/${String(type)}`];
  }
}
