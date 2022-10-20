<template>
  <v-card @click="">
    <!-- The blank click event is only for enable animation, don't use it because it may have conflict with action buttons -->
    <div id="main-panel" @click="handleClickCard">
      <v-card-item>
        <v-card-title>
          <div class="tags-container">
            <div class="attributes tags-container-item" v-for="attribute in data.attributes">
              <v-chip :color="error" label="label">
                <v-icon start icon="mdi-alert-circle"></v-icon>
                {{ attribute }}
              </v-chip>
            </div>
            <div class="tags tags-container-item" v-for="tag in data.tags">
              <v-chip :color="secondary" label="label">
                <v-icon start icon="mdi-label"></v-icon>
                {{ tag }}
              </v-chip>
            </div>
          </div>
          <v-spacer class="my-3"></v-spacer>
        </v-card-title>
        <v-card-subtitle>发布于 {{ readableTime }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <template v-if="data.attributes.find(it=>it==='NSFW')">
          <v-icon :color="unimportant">mdi-information</v-icon>
          <span
              class="theme-unimportant">这篇树洞已被发布者或管理员标记为“不适宜在工作期间查看（NSFW）”，因此其首页预览现在已被隐藏。您可能需要登录后才能继续查看该树洞的内容。</span>
        </template>
        <template v-else>
          <div class="card-text-main">
            <vue-showdown :markdown="data.preview" :options="{headerLevelStart: 3}"></vue-showdown>
          </div>
          <MediaWrapper :content="data.preview" :simplify="true"/>
        </template>
      </v-card-text>
      <div class="card-text-comments" v-if="data.comments.length!==0" v-for="comment in data.comments">
        <v-divider class="mx-3"></v-divider>
        <div class="card-text-comments-content">
          <preview-card-comment :data="generateOwnedComment(comment)"></preview-card-comment>
        </div>
      </div>
      <v-divider class="mx-3"></v-divider>
    </div>
    <div class="bottom">
      <v-card-actions>
        <v-btn prepend-icon="mdi-message-reply-text" @click="handleClickReply">评论 ({{
            data.reply_count
          }})
        </v-btn>
        <v-btn prepend-icon="mdi-share-variant" @click="handleClickShare">分享</v-btn>
        <v-btn prepend-icon="mdi-star-plus">收藏 ({{ data.star_count }})</v-btn>
      </v-card-actions>
      <div class="actions-remain" @click="handleClickCard">
        <v-spacer class="flex-grow-1"></v-spacer>
        <div class="post-id">
          <v-spacer class="flex-grow-1"></v-spacer>
          <span class="post-id-content">#{{ data.id }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import {error, secondary, unimportant} from '../../themes/color.js'
import {computed} from "vue";
import {toReadableRelativeTime} from "../../utils/time.js";
import PreviewCardComment from "./PreviewCardComment.vue";
import {useRouter} from "vue-router";
import {copyToClipboard} from "../../service/frontend.ts";
import MediaWrapper from "../view/MediaWrapper.vue";

const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

function generateOwnedComment(comment) {
  return {
    post_id: props.data.id,
    ...comment
  }
}

const readableTime = computed(() => {
  return toReadableRelativeTime(props.data.post_time)
})

function handleClickCard() {
  router.push("/view/" + props.data.id)
}

function handleClickReply() {
  router.push("/reply/" + props.data.id)
}

function handleClickShare() {
  copyToClipboard(window.location.href + "view/" + props.data.id)
}

</script>

<style scoped>
.bottom {
  /*position: absolute;*/
  /*bottom: 12px;*/
  /*right: 15px;*/
  display: flex;
  flex-direction: row;
}

.actions-remain {
  display: flex;
  width: 100%;
}

.post-id {
  display: flex;
  flex-direction: column;
}

.post-id-content {
  margin-bottom: 12px;
  margin-right: 15px;
}

.tags-container {
  display: flex;
  flex-direction: row;
  align-items: start;
}

.tags-container-item {
  margin-right: 10px;
}

.card-text-main {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
}

/*.card-text-main >>> img {*/
/*  max-width: 100%;*/
/*  max-height: 100%;*/
/*}*/

.card-text-comments-content {
  padding-left: 16px;
  padding-right: 16px;
}

.card-text-main >>> img {
  max-height: 50vh;
}
</style>
