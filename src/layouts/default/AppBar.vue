<template>
  <v-app-bar flat color="background">
    <v-app-bar-title>
      <v-img
        src="@/assets/logo.svg"
        alt="Vuetify Logo"
        max-width="60"
        max-height="60"
        class="mt-7 ml-"
        @click="test"
      />
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>

const test = () => {
  console.log(1)
}
</script>
