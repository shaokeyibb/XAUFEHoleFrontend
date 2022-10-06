<template>
  <v-app-bar :color="primary" app>
    <template v-slot:prepend v-if="icon">
      <v-btn rounded variant="text" :icon="icon.icon" @click="icon.handler">
        <v-icon size="large" :color="textLight"></v-icon>
        <v-tooltip
            activator="parent"
            location="end"
        >{{ icon.tooltip }}
        </v-tooltip>
      </v-btn>
    </template>
    <v-app-bar-title class="theme-text-light" @click="handleClickTitle">{{ title }}</v-app-bar-title>
    <div class="actions" v-for="action in actions">
      <v-btn rounded variant="text" :icon="action.icon" @click="action.handler">
        <v-icon size="large" :color="textLight"></v-icon>
        <v-tooltip
            activator="parent"
            location="start"
        >{{ action.tooltip }}
        </v-tooltip>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import {primary, textLight} from '../themes/color.js'
import {useRouter} from "vue-router";

const router = useRouter();

defineProps({
  title: {
    type: String,
    default: "XAUFEHole - 西财树洞"
  },
  icon: {
    type: Object
  },
  actions: {
    type: Array
  }
})

function handleClickTitle() {
  router.push('/')
}

</script>

