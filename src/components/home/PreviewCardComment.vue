<template>
  <div class="my-2" @click="handleClickCard">
    <div class="title">
      <span class="comment-title">{{
          getFullPosterNameByIndex(data.poster_index)
        }} 于 {{ toReadableRelativeTime(data.post_time) }} 回复：</span>
      <v-spacer class="flex-grow-1"></v-spacer>
      <span class="comment-id">#{{ data.post_id }}-{{ data.id }}</span>
    </div>
    <div class="comment-content">
      <vue-showdown :markdown="data.content" :options="{headerLevelStart: 3,simplifiedAutoLink: false}"></vue-showdown>
    </div>
    <MediaWrapper :content="data.content" :simplify="true"/>
  </div>
</template>

<script setup>
import {getFullPosterNameByIndex} from "../../utils/frontend.js";
import {toReadableRelativeTime} from "../../utils/time.js";
import {unimportant} from "../../themes/color.js";
import MediaWrapper from "../view/MediaWrapper.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

function handleClickCard() {
  router.push("/view/" + props.data.post_id + "#" + props.data.id)
}

</script>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
}

.comment-title {
  font-size: 15px;
  color: v-bind(unimportant);
}

.comment-id {
  font-size: 13px;
  color: v-bind(unimportant);
}

.comment-content {
  width: 85vw;
  max-height: 10vh;
  overflow: hidden;
}

/*.comment-content >>> img {*/
/*  max-width: 100%;*/
/*  max-height: 100%;*/
/*}*/

.comment-content >>> img {
  max-height: 50vh;
}
</style>
