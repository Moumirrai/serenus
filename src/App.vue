<template>
  <v-fade-transition>
    <router-view />
  </v-fade-transition>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore, usePlayerStore } from "@/store"
import { SocketIOManager } from "@/services/socketio.manager"
import { useRouter } from 'vue-router'
import { storeToRefs } from "pinia"
import "@/assets/styles/root.scss";

const authStore = useAuthStore();
const playerStore = usePlayerStore();
const { isAuthenticated } = storeToRefs(authStore);
const router = useRouter()

onMounted(() => {
  authStore.setStateParam()
  authStore.login()
  if (!isAuthenticated.value) {
    router.push('/Login')
  }
  new SocketIOManager(authStore, playerStore)
})

</script>
