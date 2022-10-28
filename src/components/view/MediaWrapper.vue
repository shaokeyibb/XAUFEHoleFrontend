<template>
  <div class="media-wrapper" style="margin-top: 10px;margin-bottom: 10px">
    <v-card variant="outlined"
            v-if="detectedNeteaseMusic.length!==0||detectedQQMusic.length!==0||detectedUnknownQQMusic.length!==0">
      <span style="margin-left: 10px;margin-top: 10px; font-size: 12px" class="theme-unimportant">文章中的歌曲：</span>
      <NeteaseMusicCard
          v-for="id in detectedNeteaseMusic"
          :key="id"
          :id="id"
          :simplify="simplify"
      />
      <QQMusicCard
          v-for="mid in detectedQQMusic"
          :key="mid"
          :mid="mid"
          :simplify="simplify"
      />
      <UnknownMusicCard
          v-for="unknown in detectedUnknownQQMusic"
          :link="unknown.link"
          :from="unknown.from"
          :simplify="simplify"
      />
    </v-card>
    <v-card variant="outlined" v-if="detectedBilibiliVideo.length!==0||detectedDouyinVideo.length!==0">
      <span style="margin-left: 10px;margin-top: 10px; font-size: 12px" class="theme-unimportant">文章中的视频：</span>
      <BilibiliVideoCard
          v-for="id in detectedBilibiliVideo"
          :key="id"
          :bvid="id"
          :simplify="simplify"
      />
      <DouyinVideoCard
          v-for="data in detectedDouyinVideo"
          :key="data.video_aweme_id"
          :data="data"
          :simplify="simplify"
      />
    </v-card>
    <v-card variant="outlined" v-if="detectedGitHubRepo.length!==0">
      <span style="margin-left: 10px;margin-top: 10px; font-size: 12px" class="theme-unimportant">文章中的项目：</span>
      <GitHubRepoCard
          v-for="data in detectedGitHubRepo"
          :key="data.user+'/'+data.repo"
          :user="data.user"
          :repo="data.repo"
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
import {backendApiUrl, douyinApiUrl} from "../../configurations/config.ts";
import QQMusicCard from "./QQMusicCard.vue";
import UnknownMusicCard from "./UnknownMusicCard.vue";
import GitHubRepoCard from "./GitHubRepoCard.vue";
import DouyinVideoCard from "./DouyinVideoCard.vue";

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
  const regex = /[https:\/\/y\.music\.163\.com\/m\/song\?|https:\/\/music\.163\.com\/song\?]\Wid=(\d+)/gm;
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

const detectedQQMusic = computed(() => {
  const regex = /https:\/\/y\.qq\.com\/n\/ryqq\/songDetail\/(\w{14})|https:\/\/i\.y\.qq\.com\/n2\/m\/musiclite\/playsong\/index\.html\?.*songmid=(\w{14})/gmi;
  let m;
  const result = []
  while ((m = regex.exec(props.content)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m[1] && result.push(m[1])
    m[2] && result.push(m[2])
  }
  return result
})

const detectedUnknownQQMusic = computed(() => {
  const regex = /https:\/\/y\.qq\.com\/n\/ryqq\/songDetail\/\d+$|https:\/\/c\.y\.qq\.com\/base\/fcgi-bin\/u\?__=\w+/gmi;
  let m;
  let result = []
  while ((m = regex.exec(props.content)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    result.push({
      link: m[0],
      from: "QQ音乐"
    })
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
              if (--remain <= 0) {
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

const detectedGitHubRepo = computed(() => {
  const regex = /https?:\/\/(www\.)?github\.com\/(\S+)\/(\S+)/gm;
  let m;
  const result = []
  while ((m = regex.exec(props.content)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m[2] && m[3] && result.push({
      user: m[2],
      repo: m[3]
    })
  }
  return result
})

const [detectedDouyinVideo] = useAsyncComputed(() => {
  return new Promise((resolve) => {
    let remain = 0;
    const regex = /(.*https:\/\/\w+\.douyin\.com.*)/gm;
    let m;
    const result = []
    while ((m = regex.exec(props.content)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      if (m[1]) {
        remain++;
        fetch(douyinApiUrl + "/api?url=" + encodeURIComponent(m[1]))
            .then(res => res.json())
            .then(res => {
              if (res.status === 'success') {
                result.push(res)
              }
            })
            .finally(() => {
              if (--remain <= 0) {
                resolve(result)
              }
            })
      }
    }
  })
}, [])


// const detectedPost = computed(() => {
//   const regex = /#(\d+)-(\d+)|#(\d+)/gs;
//   let m;
//   const result = []
//   while ((m = regex.exec(props.content)) !== null) {
//     if (m.index === regex.lastIndex) {
//       regex.lastIndex++;
//     }
//     m[1] && m[2] && result.push({
//       id: m[1],
//       subId: m[2]
//     })
//     m[3] && result.push({
//       id: m[3]
//     })
//   }
//   return result
// })

</script>

<style scoped>

</style>
