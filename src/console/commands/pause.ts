import { socket } from "@/services/socketio";
import { PlayerData } from "@/services/socketio.types";

const pause = {
    name: "pause",
    description: "Pause the current song",
    playerRequired: true,
    execute: async (player: PlayerData) => {
        socket.emit("player:pause", player.paused ? !player.paused : true);
    }
};

export default pause