import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import config from "@/config";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/services/socketio.types";

class SocketIOService {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  constructor() {
    this.socket = io(config.socket || "wss://flavus.xyz:3030", {
      autoConnect: false,
    });
  }
}

export const socket = new SocketIOService().socket;
