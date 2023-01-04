import { State } from "@/store/auth/AuthState";
import { createStore } from "vuex";
import { authModule } from '@/store/auth/AuthModule';
import { playerModule } from '@/store/player/PlayerModule';

export enum Modules {
  AUTH = "auth",
  PLAYER = "player",
}

const store = createStore({
  modules: {
    [Modules.PLAYER]: authModule,
    [Modules.PLAYER]: playerModule,
  },
});

export type RootState = State

export default store;
