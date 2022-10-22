<template>
  <template v-if="song">
    <v-card v-if="!simplify" class="ma-1" @click="handleClickMusicCard">
      <div style="padding: 8px 16px;">
        <!--        <v-img-->
        <!--            :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`"-->
        <!--            cover="cover"-->
        <!--            max-height="200px"-->
        <!--        ></v-img>-->
        <v-card-title>
          {{ song["track_info"].title }}
          <span v-if="song['track_info'].subtitle!==''" class="theme-unimportant"
                style="font-size: .875rem">（{{ song['track_info'].subtitle }}）</span>
          <span v-if="song['track_info'].pay['pay_play']===1" class="theme-error"
                style="font-size: .875rem">仅试听</span>
        </v-card-title>
        <v-card-subtitle>
          {{ song["track_info"].singer.map(it => it.title).join(", ") }} - {{ song["track_info"].album.title }}
        </v-card-subtitle>
      </div>
      <v-card-actions>
        <audio :src="songUrl" controls/>
      </v-card-actions>
    </v-card>
    <v-card class="ma-1" v-else>
      <div>
        <v-card-title>
          <!--          <v-avatar rounded="0">-->
          <!--            <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`" alt="album picture"/>-->
          <!--          </v-avatar>-->
          {{ song["track_info"].title }}
          <span v-if="song['track_info'].subtitle!==''" class="theme-unimportant"
                style="font-size: .875rem">（{{ song['track_info'].subtitle }}）</span>
          <span v-if="song['track_info'].pay['pay_play']===1" class="theme-error"
                style="font-size: .875rem">仅试听</span>
        </v-card-title>
        <v-card-subtitle>
          {{ song["track_info"].singer.map(it => it.title).join(", ") }} - {{ song["track_info"].album.title }}
        </v-card-subtitle>
      </div>
      <v-card-actions>
        <audio :src="songUrl" controls/>
      </v-card-actions>
    </v-card>
  </template>
</template>

<script setup>
import useAsyncComputed from "../../utils/use-async-computed.ts";
import {qqMusicApiUrl} from "../../configurations/config.ts";
import {computed} from "vue";

const props = defineProps({
  mid: {
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
  return fetch(qqMusicApiUrl + "/song?songmid=" + props.mid)
      .then(res => res.json())
}, null)

const song = computed(() => {
  return (data.value && data.value.result === 100) ? data.value.data : null
});

const [songUrl] = useAsyncComputed(() => {
  return fetch(qqMusicApiUrl + '/song/urls?id=' + props.mid)
      .then(res => res.json())
      .then(res => {
        if (res.result === 100) {
          return res.data[props.mid]
        } else {
          return null
        }
      })
      .catch(null)
}, null)

function handleClickMusicCard() {
  window.open("https://y.qq.com/n/ryqq/songDetail/" + props.mid, "_blank")
}

</script>

<style scoped>

</style>
