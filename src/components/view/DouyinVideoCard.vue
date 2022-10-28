<template>
  <template v-if="!simplify">
    <v-card v-if="data" class="ma-1" @click="handleClickCard">
      <div style="padding: 8px 16px;">
        <v-card-title>
          @{{ data.video_author }}
        </v-card-title>
        <v-card-subtitle>
          {{ data.original_url }}
        </v-card-subtitle>
        <div class="ma-1">
          {{ data.video_title }}
          <br/>
          <span>喜欢：{{ data.video_digg_count }}</span>
          <span>评论：{{ data.video_comment_count }}</span>
          <span>分享：{{ data.video_share_count }}</span>
        </div>
      </div>
    </v-card>
  </template>
  <template v-else>
    <v-card v-if="data" class="ma-1">
      <v-card-title>
        @{{ data.video_author }}
      </v-card-title>
      <v-card-subtitle>
        {{ data.video_title }}
      </v-card-subtitle>
      <v-card-text>
        {{ data.original_url }}
      </v-card-text>
    </v-card>
  </template>
</template>

<script setup>
import {unimportant} from "../../themes/color.js";

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  simplify: {
    type: Boolean,
    required: false,
    default: false
  }
})

function handleClickCard() {
  window.open(props.data.original_url, "_blank")
}

</script>

<style scoped>
span {
  color: v-bind(unimportant);
  margin-right: 4px;
  font-size: .875rem;
}
</style>
