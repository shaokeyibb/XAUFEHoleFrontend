<template>
  <v-card class="ma-1">
    <div v-if="!simplify" @click="handleClickMusicCard" style="padding: 8px 16px;">
      <v-card-title>
        未知歌曲
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
    <div v-else>
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
