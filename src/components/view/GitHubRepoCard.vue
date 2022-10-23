<template>
  <v-card v-if="!simplify" @click="handleClickCard" style="max-width:504px;max-height: 264px" class="ma-1">
    <img
        :src="'https://opengraph.githubassets.com/4df767cbd1a929e6ded1df38948bf6b30de101fe8dab17e8d70d3f8ea5afed62/'+user+'/'+repo"
        alt="GitHub Repo Card"
    />
  </v-card>
  <v-card v-else style="max-width:504px;max-height: 264px" class="ma-1">
    <img
        :src="'https://opengraph.githubassets.com/4df767cbd1a929e6ded1df38948bf6b30de101fe8dab17e8d70d3f8ea5afed62/'+user+'/'+repo"
        alt="GitHub Repo Card"
    />
  </v-card>
</template>

<script setup>

const props = defineProps({
  user: {
    type: String,
    required: true
  },
  repo: {
    type: String,
    required: true
  },
  simplify: {
    type: Boolean,
    required: false,
    default: false
  }
})

function handleClickCard() {
  window.open("https://github.com/" + props.user + "/" + props.repo)
}

</script>

<style scoped>

</style>
