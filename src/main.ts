// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import config from "@/config";
import { registerPlugins } from "@/plugins";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import store from "./store";

const app = createApp(App);
const socket = io(config.socket || "wss://flavus.xyz:3030", {
  autoConnect: false,
});
app.use(VueSocketIOExt, socket, { store });
app.use(store);

registerPlugins(app);

app.mount("#app");
