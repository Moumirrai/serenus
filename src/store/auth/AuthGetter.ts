import { GetterTree } from 'vuex';
import { State } from '@/store/auth/AuthState';
import { RootState } from '@/store';

export enum GetterTypes {
  GET_AUTHENTICATION = 'isAuthenticated'
}

export type Getters = {
  [GetterTypes.GET_AUTHENTICATION]: (state: State) => boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
  isAuthenticated: state => state.user !== undefined && state.code !== undefined
};