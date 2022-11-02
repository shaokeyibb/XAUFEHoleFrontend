<template>
  <v-app>
    <app-bar :title="title" :icon="icon" :actions="actions"></app-bar>
    <v-main>
      <v-banner lines="1" icon="mdi-alert-circle" v-if="!hasReadCookieNotice">
        <v-banner-text>
          本站点使用 Cookie 或其他类似技术以增强您的使用体验，继续使用本网站即代表您同意我们使用 Cookie 或其他类似技术。
        </v-banner-text>
        <template v-slot:actions>
          <v-btn @click="handleClickBannerDismiss">不再显示</v-btn>
        </template>
      </v-banner>
      <v-container fluid>
        <router-view v-slot="{ Component }">
          <keep-alive include="Home">
            <component :is="Component"
                       :key="$route.fullPath"
                       @modifytitle="handleModifyTitle"
                       @modifyicon="handleModifyIcon"
                       @modifyactions="handleModifyActions"/>
          </keep-alive>
        </router-view>
      </v-container>
    </v-main>
    <foot-bar></foot-bar>
    <fab-btn icon="mdi-download" color="#4CAF50" size="x-large" :position="{bottom:'96px',right:'16px'}"
             @click="handleClickPWAButton" v-if="doShowPWAButton">
      <v-icon size="large"></v-icon>
      <v-tooltip
          activator="parent"
          location="start"
      >安装应用
      </v-tooltip>
    </fab-btn>
  </v-app>
</template>

<script setup>
import {primary, secondary, textLight, textDark, error, unimportant} from './themes/color.js'
import FootBar from "./components/FootBar.vue";
import AppBar from "./components/AppBar.vue";
import {ref} from "vue";
import FabBtn from "./components/FabBtn.vue";

const title = ref("XAUFEHole - 西财树洞")
const icon = ref(undefined)
const actions = ref([])

function handleModifyTitle(newTitle) {
  title.value = newTitle
  document.title = newTitle === undefined ? 'XAUFEHole - 西财树洞' : newTitle + " | XAUFEHole - 西财树洞"
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

// For PWA

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('/serviceWorker.js')
}

const doShowPWAButton = ref(false)

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  doShowPWAButton.value = true
});

function handleClickPWAButton() {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      doShowPWAButton.value = false
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
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

img {
  max-width: 100%;
  max-height: 100%;
}

html {
  scroll-padding-top: 64px;
}

</style>
