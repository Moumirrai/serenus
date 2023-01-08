// toast.js
import {
  createToastInterface,
  EventBus,
  toastInjectionKey,
  PluginOptions,
  POSITION
} from "vue-toastification";
import type { App } from "vue";

// This will be the global event bus
const globalEventBus = new EventBus();

// Returns an interface to the global toast component tree
export function useGlobalToast() {
  return createToastInterface(globalEventBus);
}

// Use this as a plugin to register instance and injected toasts
export function provideGlobalToast(app: App) {
  const options: PluginOptions = {
    maxToasts: 3,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    position: POSITION.TOP_CENTER,
    toastClassName: "toastClass",
    bodyClassName: ["toastBodyClass"],
    transition: "Vue-Toastification__fade",
    hideProgressBar: true,
  };
  // Create the separate component tree
  const toast = createToastInterface({ ...options, eventBus: globalEventBus });

  // Provide using Vue dependency injection
  app.provide(toastInjectionKey, toast);
}
