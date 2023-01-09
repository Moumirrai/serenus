import { defineStore } from "pinia";
import { State } from "@/store/auth/types";
import { randomString } from "@/utils/randomString";
import { socket } from "@/services/socketio";
import { useToast } from "vue-toastification";
import { useGlobalToast } from "@/plugins/toast";
import config from "@/config";

import HrefToast from "@/components/toasts/HrefToast.vue";

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
          return;
        }

        let res = await fetch(`/api/auth`, {
          method: "POST",
          headers: {
            authorization: `${authCode}`,
          },
        }).catch((err) => {
          this.ongoingAuth = false;
          globalToast.error(
            {
              component: HrefToast,
              props: {
                title: "API is unavailable!",
                hrefText: "Check status page",
                href: config.statusUrl,
              },
            },
            { timeout: 30000 }
          );
          this.clearAuth();
          return;
        });
        if (!res || !res.ok) {
          globalToast.error(
            {
              component: HrefToast,
              props: {
                title: "API is unavailable!",
                hrefText: "Check status page",
                href: config.statusUrl,
              },
            },
            { timeout: 30000 }
          );
          this.ongoingAuth = false;
          this.clearAuth();
          return;
        }
        let user = await res.json();
        if (!user || !user.id) {
          this.ongoingAuth = false;
          this.clearAuth();
          return;
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
      globalToast.success("Logged out successfully!");
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
