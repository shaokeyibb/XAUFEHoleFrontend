<template>
  <div class="media-wrapper" style="margin-top: 10px;margin-bottom: 10px">
    <v-card variant="outlined" v-if="detectedNeteaseMusic.length!==0">
      <span style="margin-left: 10px;margin-top: 10px; font-size: 12px" class="theme-unimportant">文章中的歌曲：</span>
      <NeteaseMusicCard
          v-for="id in detectedNeteaseMusic"
          :key="id"
          :id="id"
          :simplify="simplify"
      />
    </v-card>
    <v-card variant="outlined" v-if="detectedBilibiliVideo.length!==0">
      <span style="margin-left: 10px;margin-top: 10px; font-size: 12px" class="theme-unimportant">文章中的视频：</span>
      <BilibiliVideoCard
          v-for="id in detectedBilibiliVideo"
          :key="id"
          :bvid="id"
          :simplify="simplify"
      />
    </v-card>
  </div>
</template>

<script setup>
import {computed} from "vue";
import NeteaseMusicCard from "./NeteaseMusicCard.vue";
import BilibiliVideoCard from "./BilibiliVideoCard.vue";

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  simplify: {
    type: Boolean,
    required: false,
    default: false
  }
})

const detectedNeteaseMusic = computed(() => {
  const regex = /[https:\/\/y\.music\.163\.com\/m\/song\?|https:\/\/music\.163\.com\/song\?][\W]id=(\d+)/gm;
  let m;
  const result = []
  while ((m = regex.exec(props.content)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m[1] && result.push(m[1])
  }
  return result
})

const detectedBilibiliVideo = computed(() => {
  const regex = /https:\/\/www\.bilibili\.com\/video\/(BV[\w]{10})/gmi;
  let m;
  const result = []
  while ((m = regex.exec(props.content)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m[1] && result.push(m[1])
  }
  return result
})

</script>

<style scoped>

</style>
