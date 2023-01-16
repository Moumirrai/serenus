<template>
  <v-fade-transition>
    <v-overlay
      v-model="forceInteraction"
      class="d-flex justify-center align-center scrim text-center"
      @click="fix"
    >
      <span class="scrimText">Click anywhere to continue</span>
      <v-spacer></v-spacer>
      <v-row class="d-flex justify-center align-center my-5">
        <v-btn
          @click="fix"
          icon
          class="d-flex justify-center"
          size="100"
          flat
          color="#00000000"
        >
          <v-icon size="50" class="plus_icon">mdi-plus</v-icon></v-btn
        >
      </v-row>
    </v-overlay>
  </v-fade-transition>
  <audio
    controls
    ref="silence"
    loop
    autoplay
    hidden
    v-if="ifCurrentTrack"
    @play="setMediaSession"
  >
    <source v-bind:src="audio" type="audio/wav" />
    Your browser does not support the audio element.
  </audio>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref, watch, onMounted } from "vue";
import { usePlayerStore } from "@/store";
import { storeToRefs } from "pinia";
import audio from "@/assets/audio/audio.mp3";

type Current = {
  title: string;
  thumbnail: string;
  author: string;
};

const playerStore = usePlayerStore();
const { paused, player, ifCurrentTrack } = storeToRefs(playerStore);
const pausedComputed: ComputedRef<boolean> = computed(() => {
  return paused === undefined ? false : (paused.value as boolean);
});
const silence = ref<HTMLAudioElement | null>(null);
const forceInteraction = ref(false);
const computedCurrent: ComputedRef<Current | undefined> = computed(() => {
  if (!player || !player.value || !player.value.current) return undefined;
  return {
    title: player.value.current.title,
    thumbnail: player.value.current.thumbnail,
    author: player.value.current.author,
  };
});

function fix() {
  forceInteraction.value = false;
  setMediaSession();
}

watch(pausedComputed, (val) => {
  setMediaSession();
});

watch(computedCurrent, (val, oldval) => {
  if (!val) return
  if (val.thumbnail === oldval?.thumbnail) {
    return;
  }
  setMediaSession();
});

function setMediaSession() {
  if (
    player === undefined ||
    player.value === undefined ||
    player.value.current === undefined
  ) {
    console.log("error collosal-whisper - not setting");
    return
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: player.value.current.title,
    artist: player.value.current.author,

    artwork: [
      {
        src: player.value.current.thumbnail,
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: player.value.current.thumbnail,
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: player.value.current.thumbnail,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: player.value.current.thumbnail,
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: player.value.current.thumbnail,
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: player.value.current.thumbnail,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });
  try {
    pausedComputed.value
      ? silence.value?.pause()
      : silence.value?.play().catch((e) => {
          console.log(e);
          forceInteraction.value = true;
        });
  } catch (e) {
    console.log(e);
  }
  navigator.mediaSession.setActionHandler("play", () => {
    playerStore.pause();
    silence.value?.play();
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    playerStore.pause();
    silence.value?.pause();
  });
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    playerStore.skip();
  });
  navigator.mediaSession.setActionHandler("stop", () => {
    console.log("stop");
    playerStore.stop();
  });
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    playerStore.seek(0);
  });
}

onMounted(() => {
  silence.value?.load();
});


</script>

<style scoped lang="scss">
.scrim {
  background-color: #1a1a1ae8;
}

.scrimText {
  color: #ffcc00;
  font-size: 2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}

.plus_icon {
  //animate smoothly color change and rotation
  transition: all 0.5s ease;
  &:hover {
    color: #ffcc00 !important;
    transform: rotate(270deg);
    font-size: 75px !important;
  }
  &:focus {
    color: #ffcc00 !important;
    transform: rotate(270deg);
  }
}
</style>
