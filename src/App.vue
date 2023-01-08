<template>
  <v-fade-transition>
    <router-view />
  </v-fade-transition>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from "@/store"
import { useRouter } from 'vue-router'
import { storeToRefs } from "pinia"
import "@/assets/styles/root.scss";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const router = useRouter()

console.log(1)

onMounted(() => {
  authStore.setStateParam()
  authStore.login()
  if (!isAuthenticated.value) {
    router.push('/Login')
  }
})

</script>
