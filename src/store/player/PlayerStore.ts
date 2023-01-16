import { defineStore } from "pinia";
import { State } from "@/store/player/types";
import { socket } from "@/services/socketio";

export const usePlayerStore = defineStore("player", {
  state: (): State => {
    return {
      player: undefined,
      guild: undefined,
      queue: undefined,
      paused: false,
      playing: false,
      position: 0,
      queueRepeat: false,
      state: false,
      hqThumb: undefined,
      dialog: false,
    };
  },
  getters: {
    ifCurrentTrack: (state) => state.player?.current !== undefined,
    getCurrentTrack: (state) => state.player?.current,
    ifDialog: (state) => state.dialog,
  },
  actions: {
    pause() {
      if (this.player && this.ifCurrentTrack && socket.connected) {
        this.paused = this.paused ? !this.paused : true;
        socket.emit("player:pause", this.paused);
      }
    },
    skip() {
      if (this.player && socket.connected) {
        socket.emit("player:skip");
      }
    },
    seek(position: number) {
      if (this.player && socket.connected && this.player.current) {
        this.position = position;
        socket.emit("player:seek", position);
      }
    },
    stop() {
      if (this.player && socket.connected) {
        socket.emit("player:stop");
      }
    },
  },
});
