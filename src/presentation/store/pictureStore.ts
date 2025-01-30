import { Module, Store } from 'vuex';
import { Picture } from '../../domain/entities/Picture';
import { RootState } from '../../shared/types/rootState';
import { PictureService } from '../../application/services/ProductService';
import { PictureRepository } from '../../domain/repository/PictureRepository';

export interface PictureState {
  pictures: Picture[];
  loading: boolean;
  error: string | null;
  filterTitle: string | null;
}

export enum PictureMutationType {
  SET_PICTURES = 'SET_PICTURES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_FILTER_TITLE = 'SET_FILTER_TITLE',
}

export enum PictureActionType {
  FETCH_PICTURES = 'FETCH_PICTURES',
}

export enum PictureGetterType {
  IS_LOADING = 'isLoading',
  GET_ERROR = 'getError',
  FILTERED_PICTURES = 'filteredPictures',
}

const pictureService = new PictureService(new PictureRepository());

export type Mutations<S = PictureState> = {
  [PictureMutationType.SET_PICTURES](state: S, payload: Picture[]): void;
  [PictureMutationType.SET_LOADING](state: S, payload: boolean): void;
  [PictureMutationType.SET_ERROR](state: S, payload: string | null): void;
  [PictureMutationType.SET_FILTER_TITLE](state: S, payload: string | null): void;
};

type ActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [PictureActionType.FETCH_PICTURES](context: ActionContext): Promise<void>;
};

export interface Getters {
  [PictureGetterType.IS_LOADING](state: PictureState): boolean;
  [PictureGetterType.GET_ERROR](state: PictureState): string | null;
  [PictureGetterType.FILTERED_PICTURES](state: PictureState): Picture[];
}

export const pictureStore: Module<PictureState, RootState> & {
  mutations: Mutations;
  actions: Actions;
  getters: Getters;
} = {
  namespaced: true,
  state: {
    pictures: [],
    loading: false,
    error: null,
    filterTitle: null,
  },
  mutations: {
    [PictureMutationType.SET_PICTURES](state, payload: Picture[]) {
      state.pictures = payload;
    },
    [PictureMutationType.SET_LOADING](state, payload: boolean) {
      state.loading = payload;
    },
    [PictureMutationType.SET_ERROR](state, payload: string | null) {
      state.error = payload;
    },
    [PictureMutationType.SET_FILTER_TITLE](state, payload: string | null) {
      state.filterTitle = payload;
    },
  },
  actions: {
    async [PictureActionType.FETCH_PICTURES]({ commit }) {
      commit(PictureMutationType.SET_LOADING, true);
      commit(PictureMutationType.SET_ERROR, null);
      try {
        const pictures = await pictureService.getPictures();
        commit(PictureMutationType.SET_PICTURES, pictures);
      } catch (error: unknown) {
        commit(PictureMutationType.SET_ERROR, 'Failed');
      } finally {
        commit(PictureMutationType.SET_LOADING, false);
      }
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    filteredPictures: (state) => {
      const filterTitle = state.filterTitle;
      if (filterTitle) {
        return state.pictures.filter((p) =>
          p.title.toLocaleLowerCase().includes(filterTitle.toLocaleLowerCase())
        );
      }
      return state.pictures;
    },
  },
};
