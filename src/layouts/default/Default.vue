<template>
  <v-app>
    <default-bar />

    <default-view />
    <console-vue />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import ConsoleVue from '@/components/nav/Console.vue'
</script>
