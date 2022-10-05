<template>
  <v-card>
    <v-card-item>
      <v-card-title>
        <div class="tags-container">
          <div class="tags tags-container-item" v-for="tag in data.tags">
            <v-chip :color="secondary" label="label">
              <v-icon start icon="mdi-label"></v-icon>
              {{ tag }}
            </v-chip>
          </div>
        </div>
        <v-spacer class="my-3"></v-spacer>
      </v-card-title>
      <h3 class="theme-primary">@{{ getFullPosterNameByIndex(data.poster_index) }}</h3>
      <div class="card_content">
        <vue-showdown :markdown="data.content"></vue-showdown>
      </div>
      <div class="metadata_container">
        <span class="theme-text_dark">{{ fullCommentId }}</span>
        <span class="theme-unimportant">{{ readableTimePrefix }} {{ readableTime }}</span>
      </div>
    </v-card-item>
    <div class="bottom">
      <v-card-actions>
        <v-btn prepend-icon="mdi-reply" v-if="data.id < 1" @click="$emit('clickReply')">回复</v-btn>
<!--        <v-btn prepend-icon="mdi-reply" v-else @click="$emit('clickReply',data.id)">回复</v-btn>-->
        <v-btn prepend-icon="mdi-alert">举报</v-btn>
        <v-btn prepend-icon="mdi-star-plus" v-if="data.id < 1">收藏</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import {secondary} from '../../themes/color.js'
import {toReadableRelativeTime} from "../../utils/time.js";
import {getFullPosterNameByIndex} from "../../utils/frontend.js";
import {computed} from "vue";

const readableTimePrefix = computed(() => {
  if (props.data.id < 1) {
    return "发布于"
  }
  return "回复于"
})

const readableTime = computed(() => {
  return toReadableRelativeTime(props.data.post_time)
})

const fullCommentId = computed(() => {
  if (props.data.id < 1) {
    return "#" + props.data.post_id
  }
  return "#" + props.data.post_id + "-" + props.data.id
})

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

defineEmits(['clickReply'])
</script>

<style scoped>
.metadata_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;
}

.card_content {
  padding-top: 16px;
  padding-bottom: 16px;
}

.card_content >>> img {
  max-width: 100%;
  max-height: 100%;
}

.tags-container {
  display: flex;
  flex-direction: row;
  align-items: start;
}

.tags-container-item {
  margin-right: 10px;
}

.bottom {
  display: flex;
  flex-direction: row;
}
</style>
