import { State, User } from "@/store/auth/AuthState";
import { MutationTree } from "vuex";

export enum MutationTypes {
  SET_ONGOING_AUTH = "SET_ONGOING_AUTH",
  SET_AUTH_STATUS = "SET_AUTH_STATUS",
  REMOVE_AUTH_STATUS = "REMOVE_AUTH_STATUS",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_ONGOING_AUTH]: (state: S, payload: boolean) => void;
  [MutationTypes.SET_AUTH_STATUS]: (
    state: S,
    payload: { code: string; user: User }
  ) => void;
  [MutationTypes.REMOVE_AUTH_STATUS]: (state: S) => void;
};

export const mutations: MutationTree<State> & Mutations = {
  SET_ONGOING_AUTH: (state, payload) => {
    state.ongoingAuth = payload;
  },
  SET_AUTH_STATUS: (state, payload) => {
    state.user = payload.user;
    state.ongoingAuth = false;
    state.code = payload.code;
  },
  REMOVE_AUTH_STATUS: (state) => {
    state.code = undefined;
    state.user = undefined;
    state.ongoingAuth = false;
  },
};
