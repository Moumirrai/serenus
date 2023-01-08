<template>
    <v-overlay v-model="overlay" class="align-center justify-center custom-overlay" opacity="0.7">
        <v-card min-width="50vw" @blur="overlay = false">
            <v-autocomplete variant="solo" :prefix="cmdLine.prefix" :placeholder="cmdLine.placeholder" hide-details
                autofocus no-data-text="Nothing found" :items="cmdLine.items" item-title="name"
                keydown.enter.native.prevent @keydown.space="onSpace($event)" @keydown="onKeydown"
                @keydown.enter.prevent="onEnter" @input="submit">

            </v-autocomplete>
        </v-card>
    </v-overlay>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useHotkeys } from 'vue-use-hotkeys';
import { pause } from "@/console/index"
import { PlayerData } from "@/services/socketio.types";

const overlay = ref(true);

type Command = {
    name: string;
    execute: (player?: PlayerData) => Promise<void | ChainCommand>;
    description?: string;
    playerRequired: boolean;
}

type ChainCommand = {
    name: string;
    commands: Command[];
}

type CmdLine = {
    model: string;
    placeholder: string;
    prefix: string;
    items: any[];
}

const cmdLine = reactive<CmdLine>({
    model: '',
    placeholder: 'Search for command',
    prefix: '>',
    items: [pause]
})

useHotkeys('ctrl + space', () => {
    overlay.value = !overlay.value;
});

const onSpace = (e: KeyboardEvent) => {
    console.log('space')
}

const onKeydown = (e: KeyboardEvent) => {
    console.log('keydown')
}

const onEnter = (e: KeyboardEvent) => {
    console.log('enter')
}

const onFocus = (e: KeyboardEvent) => {
    console.log('focus')
}

const submit = () => {
    console.log('bruh, why?')
    //console.log(cmdLine.model);
}

/*
<v-card class="console align-center fill-height justify-center" rounded="lg" min-width="40vw"
                max-width="60vw" height="auto">
                <v-autocomplete v-model="cmdLine.model" autofocus :placeholder="cmdLine.placeholder"
                    @keydown.enter.native.prevent @keydown.space="onSpace($event)" @keydown="onKeydown"
                    @keydown.enter.prevent="onEnter" @blur="overlay = false" @input="submit" chips @focus="onFocus"
                    auto-select-first :rounded="true" :single-line="true" dense :prefix="cmdLine.prefix"
                    :items="cmdLine.items" item-text="name" return-object item-value="symbol" filled outlined
                    hide-details hide-no-data label="Start typing" ref="autocomplete" height="40" full-width
                    :menu-props="{
                        maxHeight: '50vh',
                    }">
                </v-autocomplete>
            </v-card>
*/



</script>

<style lang="scss">
.v-overlay__scrim {
    background: rgba(0, 0, 0) !important;
    //light blur
    /* From https://css.glass */
}

.v-autocomplete .v-field__append-inner {
    display: none !important;
}
</style>