import { defineStore } from "pinia";
import { State } from "@/store/auth/types";
import { randomString } from "@/utils/randomString";
import { socket } from "@/services/socketio";
import { useToast } from "vue-toastification";
import { useGlobalToast } from "@/plugins/toast";

const globalToast = useGlobalToast();

export const useAuthStore = defineStore("auth", {
  state: (): State => {
    return {
      ongoingAuth: false,
      socketConnected: false,
      code: undefined,
      user: undefined,
      stateParam: undefined,
    };
  },
  getters: {
    isAuthenticated: (state) =>
      state.user !== undefined && state.code !== undefined,
    ifSocketConnected: (state) => state.socketConnected,
    getStateParam: (state) => state.stateParam,
    getUser: (state) => state.user,
    isLoading: (state) => state.ongoingAuth,
  },
  actions: {
    async login() {
      try {
        this.ongoingAuth = true;
        const fragment = new URLSearchParams(window.location.search);
        let authCode = fragment.has("code")
          ? fragment.get("code")
          : localStorage.getItem("authCode") || undefined;
        if (!authCode) {
          this.ongoingAuth = false;
          this.clearAuth();
          //TODO: toast error, and redirect to login page
          return;
        }

        let res = await fetch(`/api/auth`, {
          method: "POST",
          headers: {
            authorization: `${authCode}`,
          },
        });
        if (!res.ok) {
          this.ongoingAuth = false;
          this.clearAuth();
          return;
        }
        let user = await res.json();
        if (!user || !user.id) {
          this.ongoingAuth = false;
          this.clearAuth();
        }
        //SUCCESSFUL LOGIN
        this.code = authCode;
        this.user = user;
        this.ongoingAuth = false;
        localStorage.setItem("authCode", authCode);
        socket.io.opts.query = { code: authCode };
        socket.connect();
        globalToast.success("Logged in successfully!");
      } catch (error) {
        this.ongoingAuth = false;
        this.clearAuth();
      }
    },
    logout() {
      this.clearAuth();
      //TODO: redirect to login page
    },
    clearAuth() {
      this.code = undefined;
      this.user = undefined;
      this.ongoingAuth = false;
    },
    setStateParam() {
      this.stateParam = randomString();
    },
  },
});
