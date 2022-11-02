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
      <h3 class="theme-primary">
        @{{ getFullPosterNameByIndex(data.poster_index) }}
        <template v-if="isAdmin">（{{
            data.profile.studentID > 0 ? data.profile.studentID : ''
          }}{{ data.profile.email ? data.profile.email : '' }}）
        </template>
      </h3>
      <div class="card_content overflow-auto">
        <vue-showdown :markdown="data.content"></vue-showdown>
      </div>
      <MediaWrapper :content="data.content"/>
      <div class="metadata_container">
        <span class="theme-text_dark">{{ fullCommentId }}</span>
        <span class="theme-unimportant">{{ readableTimePrefix }} {{ readableTime }}</span>
      </div>
    </v-card-item>
    <div class="bottom">
      <v-card-actions>
        <v-btn prepend-icon="mdi-reply" v-if="data.id < 1" @click="$emit('clickReply')">回复</v-btn>
        <v-btn prepend-icon="mdi-reply" v-else @click="$emit('clickReply',data.id,data.poster_index)">回复
        </v-btn>
        <v-btn prepend-icon="mdi-alert">举报</v-btn>
        <template v-if="data.id < 1">
          <template v-if="starred===true || (starred===undefined && data.star)">
            <v-btn prepend-icon="mdi-star-check" @click="handleClickStar(false)">已收藏</v-btn>
          </template>
          <template v-else-if="starred===false || (starred===undefined && !data.star)">
            <v-btn prepend-icon="mdi-star-plus" @click="handleClickStar(true)">收藏</v-btn>
          </template>
        </template>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import {secondary} from '../../themes/color.js'
import {toReadableRelativeTime} from "../../utils/time.js";
import {getFullPosterNameByIndex} from "../../utils/frontend.js";
import {computed, ref} from "vue";
import MediaWrapper from "./MediaWrapper.vue";
import {fetchX} from "../../service/frontend.ts";
import {backendApiUrl} from "../../configurations/config.ts";
import {useUserInfoStore} from "../../stores/userInfo.js";

const userInfoStore = useUserInfoStore();
const isAdmin = computed(() => userInfoStore.isAdmin);

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

const starred = ref(undefined)

defineEmits(['clickReply'])

function handleClickStar(star) {
  fetchX(backendApiUrl + "/post/star/" + props.data.post_id, {
    method: "PATCH",
    body: JSON.stringify({
      star: star
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    if (res.status === 200) {
      starred.value = star
    }
  })
}
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

/*.card_content >>> img {*/
/*  max-width: 100%;*/
/*  max-height: 100%;*/
/*}*/

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
