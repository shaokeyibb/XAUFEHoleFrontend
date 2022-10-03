<template>
  <v-app>
    <app-bar :title="title" :icon="icon" :actions="actions"></app-bar>
    <v-main>
      <v-banner lines="one" icon="mdi-alert-circle">
        <v-banner-text>
          测试中界面，不代表最终品质
        </v-banner-text>
      </v-banner>
      <v-container fluid>
        <router-view @modifytitle="handleModifyTitle" @modifyicon="handleModifyIcon"
                     @modifyactions="handleModifyActions"></router-view>
      </v-container>
    </v-main>
    <foot-bar></foot-bar>
  </v-app>
</template>

<script setup>
import {primary, secondary, textLight, textDark, error, unimportant} from './themes/color.js'
import FootBar from "./components/FootBar.vue";
import AppBar from "./components/AppBar.vue";
import {ref} from "vue";

const title = ref("XAUFEHole - 西财树洞")
const icon = ref(undefined)
const actions = ref([])

function handleModifyTitle(newTitle) {
  title.value = newTitle
}

function handleModifyIcon(newIcon) {
  icon.value = newIcon
}

function handleModifyActions(newActions) {
  actions.value = newActions
}

</script>

<style>
.theme-primary {
  color: v-bind(primary);
}

.theme-secondary {
  color: v-bind(secondary);
}

.theme-text-light {
  color: v-bind(textLight);
}

.theme-text-dark {
  color: v-bind(textDark);
}

.theme-error {
  color: v-bind(error);
}

.theme-unimportant {
  color: v-bind(unimportant);
}
</style>
