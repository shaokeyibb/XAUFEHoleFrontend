<template>
  <div class="post" v-for="post in view_data.posts" :id="post.id ? post.id : undefined">
    <!--The id anchor may have broken by unknown issue-->
    <view-card :data="generateOwnedComment(post)" @clickReply="handleClickReply"></view-card>
    <v-spacer class="mb-3"></v-spacer>
  </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import ViewCard from "../components/view/ViewCard.vue";
import {onMounted, reactive} from "vue";
import useAsyncComputed from "../utils/use-async-computed.ts";
import {fetchX} from "../service/frontend.ts";
import {backendApiUrl} from "../configurations/config.ts";

const router = useRouter()
const route = useRoute()

function handleClickAppbarIcon() {
  router.push("/")
}

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

function initial(id) {
  emit('modifytitle', '树洞详细 #' + id)
  emit('modifyicon', {
    icon: "mdi-arrow-left",
    tooltip: "返回主页",
    handler: handleClickAppbarIcon
  })
  emit('modifyactions', [
    {
      icon: "mdi-reply",
      tooltip: "回复此树洞",
      handler: () => handleClickReply()
    }
  ])
}

function handleClickReply(subId, poster_index) {
  if (subId === undefined || poster_index === undefined) {
    router.push("/reply/" + route.params.id)
  } else {
    router.push("/reply/" + route.params.id + "/" + subId + "?poster_index=" + poster_index)
  }
}

function generateOwnedComment(comment) {
  return {
    post_id: view_data.value.id,
    ...comment
  }
}

onMounted(() => {
  initial(route.params.id)
})

// const view_data = ref(reactive({
//   id: 1,
//   posts: [
//     {
//       id: 0, // main post has no comment id
//       poster_index: -1,
//       post_time: 1664551473,
//       content: "# 欢迎来到西财树洞！",
//       attributes: ["置顶"]
//     },
//     {
//       id: 1,
//       poster_index: 0,
//       post_time: 1664553033,
//       content: "火钳刘明"
//     },
//     {
//       id: 2,
//       poster_index: 1,
//       post_time: 1664553033,
//       content: "火钳刘明"
//     },
//     {
//       id: 3,
//       poster_index: 2,
//       post_time: 1664553033,
//       content: "火钳刘明"
//     }
//   ]
// }))

const [view_data] = useAsyncComputed(() => {
  return fetchX(backendApiUrl + "/post/view/" + route.params.id).then(res => reactive(res.json()))
}, reactive({
  id: 0,
  posts: []
}))

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    initial(to.params.id)
  }
})
</script>

<style scoped>

</style>
