<template>
  <div v-for="data in test_data">
    <post-card :data="data"></post-card>
    <v-spacer class="mb-3"></v-spacer>
  </div>
  <div class="no-more-post">
    <span class="no-more-post-content">已经到底了噢</span>
    <v-divider class="mx-16 my-4" style="size: 16px"></v-divider>
  </div>
  <fab-btn icon="mdi-plus" :color="secondary" size="x-large" @click="handleClickFabBtn"></fab-btn>
</template>

<script>
import router from "../plugins/vuerouter.js";

function handleClickAccountBtn() {
  router.push('/login')
}
</script>

<script setup>
import {secondary, unimportant} from '../themes/color.js'
import FabBtn from "../components/FabBtn.vue";
import PostCard from "../components/home/PostCard.vue";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

onMounted(() => {
  emit('modifytitle', undefined)
  emit('modifyicon', undefined)
  emit('modifyactions', [
    {
      icon: "mdi-account-circle",
      tooltip: "登录",
      handler: handleClickAccountBtn
    }
  ])
})

function handleClickFabBtn(){
  router.push("/create")
}

const test_data = [
  {
    id: 1,
    post_time: 1664551473,
    preview: "# 欢迎来到西财树洞！",
    reply_count: Math.floor((Math.random() * 10) + 1),
    star_count: Math.floor((Math.random() * 10) + 1),
    attributes: ["置顶"],
    comments: [
      {
        id: 1,
        poster_index: 0,
        post_time: 1664553033,
        content: "火钳刘明"
      }
    ]
  },
  {
    id: 2,
    post_time: 1664552385,
    preview: "这个树洞好有意思啊，插个眼",
    reply_count: Math.floor((Math.random() * 10) + 1),
    star_count: Math.floor((Math.random() * 10) + 1),
    tags: ["新人报到"],
    comments: []
  }
]
</script>

<style scoped>
.no-more-post {
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.no-more-post-content {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 25%);
  font-size: 14px;
  color: v-bind(unimportant);
  background-color: white;
}
</style>
