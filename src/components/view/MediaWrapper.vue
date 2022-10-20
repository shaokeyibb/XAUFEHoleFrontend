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
import useAsyncComputed from "../../utils/use-async-computed.ts";
import {backendApiUrl} from "../../configurations/config.ts";

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

const [detectedBilibiliVideo] = useAsyncComputed(() => {
  return new Promise((resolve) => {
    const result = []

    const regex = /https:\/\/(www|m)\.bilibili\.com\/video\/(BV\w{10})/gmi;
    let m;
    while ((m = regex.exec(props.content)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m[2] && result.push(m[2])
    }

    let remain = 0;
    const regex2 = /https:\/\/b23\.tv\/([a-zA-Z0-9]+)/gmi;
    let m2;
    while ((m2 = regex2.exec(props.content)) !== null) {
      if (m2.index === regex2.lastIndex) {
        regex2.lastIndex++;
      }
      if (m2[1]) {
        remain++;
        fetch(backendApiUrl + "/bilibili/uniqueKeyToBvid?unique_k=" + m2[1])
            .then(res => res.text())
            .then(res => {
              result.push(res)
            })
            .finally(() => {
              remain--;
              if (remain <= 0) {
                resolve(result)
              }
            })
      }
    }

    if (remain === 0) {
      resolve(result)
    }
  })
}, [])


</script>

<style scoped>

</style>
