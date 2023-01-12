<template>
  <audio
    controls
    ref="silence"
    autoplay="true"
    loop
    hidden
    muted
  >
    <source v-bind:src="audioSpoof" type="audio/wav" />
    Your browser does not support the audio element.
  </audio>
</template>

<script lang="ts" setup>
import { computed, reactive, WritableComputedRef, ref, watch, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { usePlayerStore, useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import audio from '@/assets/audio/audio.mp3'

const playerStore = usePlayerStore();

const { paused, player } = storeToRefs(playerStore);
//import mp3 file



const silence = ref<HTMLAudioElement | null>(null);

const audioSpoof = ref<string | undefined>(audio);

onMounted(() => {
  silence.value?.load();
});
</script>