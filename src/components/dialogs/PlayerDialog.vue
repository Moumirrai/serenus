<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card fullscreen color="background">
      <v-toolbar color="background" flat dense class="justify-center">
        <v-row justify="center">
          <v-btn icon dark @click="dialog = false">
            <v-icon class="chevron-down">mdi-chevron-down</v-icon>
          </v-btn>
        </v-row>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/store";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify"

const playerStore = usePlayerStore();

const { dialog } = storeToRefs(playerStore);
</script>

<style lang="scss" scoped>

.chevron-down {
  transform: scale(2, 1);
  transition: all 0.5s ease;
  &:hover {
    color: #ffcc00 !important;
    //animate little moovment down and back to original position
    transform: scale(2, 1) translateY(2px);
  }
}

</style>
