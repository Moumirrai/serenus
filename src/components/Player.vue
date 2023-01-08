<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-btn :href="loginUrl">
        <v-icon>mdi-vuetify</v-icon>
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import config from '@/config';
import { useAuthStore } from "@/store"
import { storeToRefs } from "pinia"


type QueryParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
};

const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);

const loginUrl = computed(() => {
  if (authStore.getStateParam === undefined) return
  const loginParams: QueryParams = {
    client_id: config.clientId,
    redirect_uri: `${config.home}`,
    response_type: "code",
    scope: "identify guilds",
    state: window.btoa(authStore.getStateParam),
  };
  return `${config.discordApi}/oauth2/authorize?${new URLSearchParams(loginParams).toString()}`;
});


</script>
