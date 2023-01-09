<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-btn @click="test">
        <v-icon>mdi-vuetify</v-icon>
      </v-btn>
      <v-card>
        {{ player?.current?.title }}
        <v-spacer></v-spacer>
        {{ player?.current?.author }}
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import config from '@/config';
import { usePlayerStore, useAuthStore } from "@/store"
import { storeToRefs } from "pinia"


type QueryParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
};

const authStore = useAuthStore();
const playerStore = usePlayerStore();

const { isAuthenticated } = storeToRefs(authStore);
const { player } = storeToRefs(playerStore);

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

const test = () => {
  console.log(player)
}


</script>
