<template>
  <template v-if="!simplify">
    <v-card v-if="video" class="ma-1">
      <span @click="handleClickVideoCard">{{ video.title }} - {{ video.owner.name }}（{{ bvid }}）</span>
      <div class="bilibili-video-card">
        <iframe :src="'//player.bilibili.com/player.html?bvid='+bvid" height="100%" width="100%"></iframe>
      </div>
    </v-card>
  </template>
  <template v-else>
    <v-card v-if="video" class="ma-1">
      <v-card-title>
        {{ video.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ video.owner.name }}
      </v-card-subtitle>
      <v-card-text>
        {{ bvid }}
      </v-card-text>
    </v-card>
  </template>
</template>

<script setup>
import useAsyncComputed from "../../utils/use-async-computed.ts";
import {computed} from "vue";
import {backendApiUrl} from "../../configurations/config.ts";

const props = defineProps({
  bvid: {
    type: String,
    required: true
  },
  simplify: {
    type: Boolean,
    required: false,
    default: false
  }
})

const [data] = useAsyncComputed(() => {
  return fetch(backendApiUrl + "/bilibili/view?bvid=" + props.bvid)
      .then(res => res.json())
}, null)

const video = computed(() => (data.value && data.value.code === 0) ? data.value.data : null)

function handleClickVideoCard() {
  window.open("https://www.bilibili.com/video/" + props.bvid, "_blank")
}

</script>

<style scoped>
.bilibili-video-card {
  height: calc(100vw * 9 / 16);
  width: calc(100%);
}
</style>
