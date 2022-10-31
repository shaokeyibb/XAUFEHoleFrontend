<template>
  <div class="post" v-for="post in generateSortedData()" :id="post.id ? post.id : undefined">
    <view-card :data="generateOwnedComment(post)" @clickReply="handleClickReply"></view-card>
    <v-spacer class="mb-3"></v-spacer>
  </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import ViewCard from "../components/view/ViewCard.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import useAsyncComputed from "../utils/use-async-computed.ts";
import {fetchX} from "../service/frontend.ts";
import {backendApiUrl} from "../configurations/config.ts";

const router = useRouter()
const route = useRoute()

function handleClickAppbarIcon() {
  router.push("/")
}

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

let isAscending = ref(true)

let actions = computed(() => {
  if (isAscending.value)
    return [
      {
        icon: "mdi-sort-descending",
        tooltip: "按时间降序排列",
        handler: () => handleClickSort(false)
      },
      {
        icon: "mdi-reply",
        tooltip: "回复此树洞",
        handler: () => handleClickReply()
      }
    ]
  else
    return [
      {
        icon: "mdi-sort-ascending",
        tooltip: "按时间升序排列",
        handler: () => handleClickSort(true)
      },
      {
        icon: "mdi-reply",
        tooltip: "回复此树洞",
        handler: () => handleClickReply()
      }
    ]
})

watch(actions, (newVal) => {
  emit('modifyactions', newVal)
})

function generateSortedData() {
  if (!isAscending.value) return [...view_data.value.posts].sort((a, b) => b.id - a.id)
  else return [...view_data.value.posts].sort((a, b) => a.id - b.id)
}

function initial(id) {
  emit('modifytitle', '树洞详细 #' + id)
  emit('modifyicon', {
    icon: "mdi-arrow-left",
    tooltip: "返回主页",
    handler: handleClickAppbarIcon
  })
  emit('modifyactions', actions.value)
}

function handleClickSort(value) {
  isAscending.value = value
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
    star: view_data.value.star,
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
  if (!route.params.id) return reactive({
    id: 0,
    posts: []
  })
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
