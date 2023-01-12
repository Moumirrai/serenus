<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="d-flex fill-height">
      <player-media-session />
      <div v-if="!smAndDown" class="mx-16">
        <v-row class="mt-16">
          <v-col :cols="7">
            <v-card color="background" flat class="fill-height">
              <p class="track-title">
                <span>
                  {{
                    player?.current ? player.current.title : "Nothing playing"
                  }}
                </span>
              </p>
              <p class="track-author">
                <span>
                  {{ player?.current?.author }}
                </span>
              </p>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card color="background" class="fill-height" flat>
              <v-img
                :src="hqThumb ? hqThumb : player?.current?.thumbnail"
                :lazy-src="player?.current?.thumbnail"
                alt="thumbnail"
                aspect-ratio="1"
                cover
              />
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else :class="xs ? 'mt-5' : 'mt-16'">
        <v-row class="d-flex justify-center">
          <v-card
            color="background"
            flat
            :max-width="xs ? '80vw' : '500px'"
            class="text-center"
          >
            <v-img
              :src="hqThumb ? hqThumb : player?.current?.thumbnail"
              :lazy-src="player?.current?.thumbnail"
              alt="thumbnail"
              aspect-ratio="1"
              cover
              width="500px"
            />
          </v-card>
        </v-row>
        <v-row :class="`d-flex justify-center ${xs ? 'mt-5' : 'mt-16'}`">
          <v-card
            color="background"
            flat
            class="fill-height"
            :max-width="xs ? '80vw' : '500px'"
          >
            <p class="text-center mobile-track-title sm">
              <span>
                {{ player?.current ? player.current.title : "Nothing playing" }}
              </span>
            </p>
            <p class="text-center mobile-track-author">
              <span>
                {{ player?.current?.author }}
              </span>
            </p>
          </v-card>
        </v-row>
      </div>
      <v-card :class="xs ? 'mobile-footer' : 'footer'" flat color="background">
        <v-row class="mt-5 mx-5 d-flex align-center">
          <span>{{ format(positionComputed) }}</span>
          <v-slider
            v-model="positionComputed"
            :max="player?.current?.duration"
            min="0"
            step="1"
            @mousedown="positionBar.isDragged = true"
            @touchstart="positionBar.isDragged = true"
            track-fill-color="primary"
            class="mx-5 mt-5"
          >
          </v-slider>
          <span>{{
            format(player?.current?.duration ? player?.current?.duration : 0)
          }}</span>
        </v-row>
        <v-row class="d-flex justify-center align-center my-5">
          <v-btn icon flat color="background"
            ><v-icon size="32" @click="playerStore.seek(0)"
              >mdi-skip-previous</v-icon
            ></v-btn
          >
          <v-btn
            icon
            flat
            class="mr-5 ml-5"
            color="background"
            @click="playerStore.pause()"
            ><v-icon v-if="!paused" size="32">mdi-pause</v-icon
            ><v-icon v-else size="32">mdi-play</v-icon></v-btn
          >
          <v-btn icon flat color="background" @click="playerStore.skip()"
            ><v-icon size="32">mdi-skip-next</v-icon></v-btn
          >
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, reactive, WritableComputedRef, ref, watch } from "vue";
import config from "@/config";
import { useDisplay } from "vuetify";
import { usePlayerStore, useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import format from "format-duration";
import PlayerMediaSession from "./PlayerMediaSession.vue";

const { smAndDown, xs } = useDisplay();

const positionBar = reactive({
  position: 0,
  isDragged: false,
});

const thumbnail = ref("");

const authStore = useAuthStore();
const playerStore = usePlayerStore();

const { isAuthenticated } = storeToRefs(authStore);
const { player, position, playing, paused, hqThumb } = storeToRefs(playerStore);

const positionComputed: WritableComputedRef<number> = computed({
  get(): number {
    return positionBar.isDragged
      ? positionBar.position
      : position?.value
      ? position.value
      : 0;
  },
  set(newValue: number): void {
    positionBar.position = newValue;
  },
});

window.addEventListener(
  "mouseup",
  function (e) {
    if (positionBar.isDragged) {
      playerStore.seek(positionComputed.value);
      positionBar.isDragged = false;
    }
  },
  false
);

window.addEventListener(
  "touchend",
  function (e) {
    if (positionBar.isDragged) {
      playerStore.seek(positionComputed.value);
      positionBar.isDragged = false;
    }
  },
  false
);
</script>

<style scoped lang="scss">
.footer {
  position: absolute;
  bottom: 20px;
  width: 86%;
  margin-left: 7%;
  margin-right: 7%;
}

.mobile-footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

.test {
  background-color: red;
}

.track-title {
  font-family: "Poppins", sans-serif;
  font-size: calc(1rem + 2vw);
  color: #ffcc00;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.track-author {
  margin-top: 2rem;
  font-family: "Poppins", sans-serif;
  font-size: calc(1rem + 0.5vw);
  color: #ababab;
  font-weight: 500;
}

.mobile-track-title {
  font-family: "Poppins", sans-serif;
  font-size: calc(1rem + 2vw);
  color: #ffcc00;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.mobile-track-author {
  margin-top: 2rem;
  font-family: "Poppins", sans-serif;
  font-size: calc(1rem + 0.5vw);
  color: #ababab;
  font-weight: 500;
}
</style>
