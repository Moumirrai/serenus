import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/services/socketio.types";
import { socket } from "@/services/socketio";
import { useAuthStore, usePlayerStore } from "@/store";
import { useGlobalToast } from "@/plugins/toast";

class SocketIOManager {
  authStore: ReturnType<typeof useAuthStore>;
  playerStore: ReturnType<typeof usePlayerStore>;
  socket = socket;
  globalToast = useGlobalToast();
  constructor(
    authStore: ReturnType<typeof useAuthStore>,
    playerStore: ReturnType<typeof usePlayerStore>
  ) {
    this.authStore = authStore;
    this.playerStore = playerStore;
    this.authListener();
    this.playerListener();
  }
  private authListener() {
    this.socket.on("connect", () => {
      this.globalToast.success("Socket connected");
    });
    this.socket.on("disconnect", () => {
      this.playerStore.$reset();
      this.globalToast.error("Socket disconnected");
    });
  }
  private playerListener() {
    this.socket.on("player:data", (playerData) => {
      //player will have only fraction of data, i want you to take whats inside and assign it to the correspoinding key in store
      if (playerData.player !== undefined) {
        const oldTrack = this.playerStore.player?.current?.identifier;
        this.playerStore.player = playerData.player;
        if (oldTrack !== playerData.player?.current?.identifier) {
          var img = new Image();
          img.src = `https://img.youtube.com/vi/${playerData.player?.current?.identifier}/maxresdefault.jpg`;
          img.onload = () => {
            if (img.width !== 120) {
              this.playerStore.hqThumb = `https://img.youtube.com/vi/${playerData.player?.current?.identifier}/maxresdefault.jpg`;
            } else {
              this.playerStore.hqThumb = undefined;
            }
          };
        }
      } else {
        this.playerStore.player = undefined;
        this.playerStore.position = 0;
        this.playerStore.queue = undefined;
        this.playerStore.playing = false;
        this.playerStore.paused = false;
        this.playerStore.queueRepeat = false;
        this.playerStore.hqThumb = undefined;
      }
      if (playerData.guild !== undefined)
        this.playerStore.guild = playerData.guild;
      if (playerData.paused !== undefined)
        this.playerStore.paused = playerData.paused;
      if (playerData.playing !== undefined)
        this.playerStore.playing = playerData.playing;
      if (playerData.position !== undefined)
        this.playerStore.position = playerData.position;
      if (playerData.queueRepeat !== undefined)
        this.playerStore.queueRepeat = playerData.queueRepeat;
      if (playerData.state !== undefined)
        this.playerStore.state = playerData.state;
    });
    this.socket.on("player:queueData", (queue) => {
      if (queue !== undefined) this.playerStore.queue = queue;
    });
    this.socket.on("player:error", (error) => {
      this.globalToast.error(error);
    });
    this.socket.on("api:rateLimit", (rateLimit) => {
      this.globalToast.error(rateLimit);
    });
  }
}

export { SocketIOManager };
