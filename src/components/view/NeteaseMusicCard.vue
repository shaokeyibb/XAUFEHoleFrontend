<template>
  <v-card v-if="song" @click="" style="margin: 20px">
    <template v-if="!simplify">
      <div @click="handleClickMusicCard">
        <v-img
            :src="song.al.picUrl"
            cover="cover"
            max-height="200px"
        ></v-img>
        <v-card-title>
          {{ song.name }}
          <span v-if="song.alia && song.alia.length>0" class="theme-unimportant">（{{ song.alia[0] }}）</span>
        </v-card-title>
        <v-card-subtitle>
          {{ song.ar.map(it => it.name).join(", ") }} - {{ song.al.name }}
        </v-card-subtitle>
      </div>
      <v-card-actions>
        <audio :src="songUrl" controls/>
      </v-card-actions>
    </template>
    <template v-else>
      <div @click="handleClickMusicCard">
        <v-card-title>
          <v-avatar rounded="0">
            <img :src="song.al.picUrl" alt="album picture"/>
          </v-avatar>
          {{ song.name }}
          <span v-if="song.alia && song.alia.length>0" class="theme-unimportant">（{{ song.alia[0] }}）</span>
        </v-card-title>
        <v-card-subtitle>
          {{ song.ar.map(it => it.name).join(", ") }} - {{ song.al.name }}
        </v-card-subtitle>
      </div>
      <v-card-actions>
        <audio :src="songUrl" controls/>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script setup>
import useAsyncComputed from "../../utils/use-async-computed.ts";
import {neteaseApiUrl} from "../../configurations/config.ts";
import {computed} from "vue";

const props = defineProps({
  id: {
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
  return fetch(neteaseApiUrl + "/song/detail?ids=" + props.id)
      .then(res => res.json())
}, null)

const song = computed(() => {
  return (data.value && data.value.code === 200) ? data.value.songs[0] : null
});

const [songUrl] = useAsyncComputed(() => {
  return fetch(neteaseApiUrl + '/song/url?id=' + props.id)
      .then(res => res.json())
      .then(res => res.data[0].url.replace("http://", "https://"))
}, null)

function handleClickMusicCard() {
  window.open("https://music.163.com/song?id=" + props.id, "_blank")
}

</script>

<style scoped>

</style>
