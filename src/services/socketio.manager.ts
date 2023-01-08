import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/services/socketio.types";
import { socket } from "@/services/socketio";
import { useAuthStore, usePlayerStore } from "@/store";
import { useGlobalToast } from "@/plugins/toast";

class SocketIOManager {
  authStore: ReturnType<typeof useAuthStore>
  playerStore: ReturnType<typeof usePlayerStore>
  socket = socket;
  globalToast = useGlobalToast();
  constructor(authStore: ReturnType<typeof useAuthStore>, playerStore: ReturnType<typeof usePlayerStore>) {
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
      this.globalToast.error("Socket disconnected");
    });
  }
  private playerListener() {
    this.socket.on("player:data", (player) => {
      console.log("player:data", player);
    });
    this.socket.on("player:queueData", (queue) => {
        console.log("player:queueData", queue);
    });
  }
}

export { SocketIOManager }
