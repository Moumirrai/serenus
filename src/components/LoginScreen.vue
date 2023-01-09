<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center fill-height">
      <v-card :loading="isLoading" class="mx-auto d-flex align-center justify-center fill-height"
        :max-height="smAndDown ? '70vh' : '40vh'" :max-width="smAndDown ? '' : '800px'" :min-height="smAndDown ? '50vh' : ''">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear :active="isActive" color="primary" height="5" indeterminate></v-progress-linear>
        </template>
        <v-row>
          <v-col v-if="!smAndDown" cols="5" class="d-flex child-flex">
            <v-img src="@/assets/graphics/login-backdrop.png" cover height="100%" class="mx-auto"></v-img>
          </v-col>
          <v-col :cols="smAndDown ? '12' : '7'">
            <v-card-title class="text-center">
              <h2 class="mx-auto mt-16">Welcome back!</h2>
            </v-card-title>
            <v-card-subtitle class="text-center mt-0">
              <span class="subheading mx-auto">Please login to continue</span>
            </v-card-subtitle>
            <v-card-text class="text-center mt-16">
              <v-btn :href="loginUrl" x-large color="primary" style="color: black" :loading="isLoading" :disabled="isLoading">
                Login</v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
</template>


<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router'
import config from '@/config';
import { useAuthStore } from "@/store"
import { storeToRefs } from "pinia"
import { useToast } from "vue-toastification";
import NotificationToast from "@/components/toasts/NotificationToast.vue"
import { useDisplay } from 'vuetify'

type QueryParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
};

const authStore = useAuthStore();
const router = useRouter()
const toast = useToast();
const { isLoading, isAuthenticated } = storeToRefs(authStore);
const { smAndDown } = useDisplay()

///METHODS

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

const content = {
  // Your component or JSX template
  component: NotificationToast,

  // Props are just regular props, but these won't be reactive
  props: {
    content: "Player added to queue"
  },
};

const test = () => {
  toast.error("I'm a toast!");
  /*
  toast(content, {
    closeOnClick: true,
    timeout: 3000,
    icon: false,
    closeButtonClassName: "toast-close-button-custom",
    hideProgressBar: true,
  })
  */
}

///LIFECYCLE HOOKS

onBeforeMount(() => {
  if (isAuthenticated.value) {
    router.push({ path: '/' })
  }
})

watch(isAuthenticated, (val) => {
  console.log(val)
  if (val) {
    console.log("redirecting")
    router.push({ path: '/' })
  }
})

</script>

<style lang="scss">
.toast-close-button-custom {
  font-size: 32px;
}
</style>
