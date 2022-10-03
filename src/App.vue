<template>
  <v-app>
    <app-bar :title="title" :icon="icon" :actions="actions"></app-bar>
    <v-main>
      <v-banner :lines="1" icon="mdi-alert-circle" v-if="!hasReadCookieNotice">
        <v-banner-text>
          本站点使用 Cookie 或其他类似技术以增强您的使用体验，继续使用本网站即代表您同意我们使用 Cookie 或其他类似技术。
        </v-banner-text>
        <template v-slot:actions>
          <v-btn @click="handleClickBannerDismiss">Dismiss</v-btn>
        </template>
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
  document.title = newTitle===undefined ? 'XAUFEHole - 西财树洞' : newTitle + " | XAUFEHole - 西财树洞"
}

function handleModifyIcon(newIcon) {
  icon.value = newIcon
}

function handleModifyActions(newActions) {
  actions.value = newActions
}

const hasReadCookieNotice = ref(localStorage.getItem("hasReadCookieNotice") === "true")

function handleClickBannerDismiss() {
  hasReadCookieNotice.value = true
  localStorage.setItem("hasReadCookieNotice", "true")
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
