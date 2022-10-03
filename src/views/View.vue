<template>
  <div class="post" v-for="post in test_view_data.posts" :id="post.id ? post.id : undefined">
    <!--The id anchor may have broken by unknown issue-->
    <view-card :data="generateOwnedComment(post)" @clickReply="handleClickReply"></view-card>
    <v-spacer class="mb-3"></v-spacer>
  </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import ViewCard from "../components/view/ViewCard.vue";
import {onMounted, reactive, ref} from "vue";

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

function handleClickReply(subId) {
  if (!subId) {
    router.push("/reply/" + route.params.id)
  } else {
    router.push("/reply/" + route.params.id + "/" + subId)
  }
}

function generateOwnedComment(comment) {
  comment["post_id"] = test_view_data.value.id
  return comment;
}

onMounted(() => {
  initial(route.params.id)
})

const test_view_data = ref(reactive({
  id: 1,
  posts: [
    {
      id: 0, // main post has no comment id
      poster_index: -1,
      post_time: 1664551473,
      content: "# 欢迎来到西财树洞！",
      attributes: ["置顶"]
    },
    {
      id: 1, // main post has no comment id
      poster_index: 0,
      post_time: 1664553033,
      content: "火钳刘明"
    },
    {
      id: 2, // main post has no comment id
      poster_index: 0,
      post_time: 1664553033,
      content: "火钳刘明"
    },
    {
      id: 3, // main post has no comment id
      poster_index: 0,
      post_time: 1664553033,
      content: "火钳刘明"
    }
  ]
}))

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    initial(to.params.id)
  }
})
</script>

<style scoped>

</style>