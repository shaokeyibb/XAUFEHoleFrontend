<template>
  <v-card v-if="!simplify" class="ma-1" @click="handleClickMusicCard">
    <div style="padding: 8px 16px;">
      <v-card-title>
        无法识别的歌曲
        <span v-if="from" class="theme-unimportant"
              style="font-size: .875rem">（来自 {{ from }}）</span>
      </v-card-title>
      <v-card-subtitle>
        {{ link }}
      </v-card-subtitle>
      <v-card-actions>
        <audio :src="undefined" controls/>
      </v-card-actions>
    </div>
  </v-card>
  <v-card v-else class="ma-1">
    <div>
      <v-card-title>
        未知歌曲
        <span class="theme-unimportant"
              style="font-size: .875rem">（来自 {{ from }}）</span>
      </v-card-title>
      <v-card-subtitle>
        {{ link }}
      </v-card-subtitle>
      <v-card-actions>
        <audio :src="undefined" controls/>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  link: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: false
  },
  simplify: {
    type: Boolean,
    required: false,
    default: false
  }
})

function handleClickMusicCard() {
  window.open(props.link, "_blank")
}

</script>

<style scoped>

</style>
