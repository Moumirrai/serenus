import { Module } from 'vuex';
import { State, state } from '@/store/auth/AuthState';
import { RootState } from "@/store";
import { mutations } from '@/store/auth/AuthMutations';
import { actions } from '@/store/auth/AuthActions';
import { getters } from '@/store/auth/AuthGetter';

export const authModule: Module<State, RootState> = {
  namespaced: true,
  state: () => state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}