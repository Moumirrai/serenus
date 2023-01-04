import { ActionContext, ActionTree } from "vuex";
import { State, User } from "@/store/auth/AuthState";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/auth/AuthMutations";
import config from "@/config";

//TODO: rewrite for player with sockets

export enum ActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type Actions = {
  [ActionTypes.LOGIN]: (
    context: ActionContext<State, RootState>,
    code?: string
  ) => void;
  [ActionTypes.LOGOUT]: (context: ActionContext<State, RootState>) => void;
};

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.LOGIN]: ({ commit }, code?) => {
    commit(MutationTypes.SET_ONGOING_AUTH, true);
    let authCode = code;
    if (!code) authCode = localStorage.getItem("authCode") || undefined;
    if (!authCode) {
      commit(MutationTypes.SET_ONGOING_AUTH, false);
      commit(MutationTypes.REMOVE_AUTH_STATUS);
      //TODO: toast error, and redirect to login page
      return;
    }

    //API request
    fetch(`/api/auth`, {
      method: "POST",
      headers: {
        authorization: `${authCode}`,
      },
    })
      .then((res) => res.json())
      .then((res: User) => {
        if (!res || !res.id) {
          commit(MutationTypes.SET_ONGOING_AUTH, false);
          commit(MutationTypes.REMOVE_AUTH_STATUS);
          //TODO: toast error, and redirect to login page
            return;
        }
        localStorage.setItem("authCode", authCode as string);
        commit(MutationTypes.SET_AUTH_STATUS, { code: authCode, user: res });
        //TODO: toast success, do not redirect
      })
      .catch((err) => {
        commit(MutationTypes.SET_ONGOING_AUTH, false);
        commit(MutationTypes.REMOVE_AUTH_STATUS);
        //TODO: toast error, and redirect to login page
        return
      });

    //Commit
    commit(MutationTypes.SET_AUTH_STATUS, { code, user: { name: "John Doe" } });
  },

  [ActionTypes.LOGOUT]: ({ commit }) =>
    commit(MutationTypes.SET_AUTH_STATUS, false),
};
