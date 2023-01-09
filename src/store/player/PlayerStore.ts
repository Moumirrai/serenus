import { defineStore } from "pinia";
import { State } from "@/store/player/types";


export const usePlayerStore = defineStore("player", {
  state: (): State => {
    return { player: undefined };
  },
  getters: {
    
  },
  actions: {
  },
});
