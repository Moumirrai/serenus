/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CLIENT_ID: string;
  readonly VITE_APP_BOT_API: string;
  readonly VITE_APP_SOCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
