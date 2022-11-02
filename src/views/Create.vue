<template>
  <tag-selector :disabled="isSending" :max-tags="2"
                :tags="['日常', '生活', '学习']"
                v-model="selectedTags">
  </tag-selector>
  <v-spacer class="my-3"></v-spacer>
  <editor :loading="isSending" :disabled="isSending" :error="error" :error-message="errorMessage"
          v-model="content" v-model:show-image-uploader="showImageUploader"></editor>
  <v-switch v-model="isNSFW" :disabled="isSending"
            :color="secondary"
            label="将这篇树洞标记为 NSFW"
            messages="是否将这篇树洞标记为“不适宜在工作期间查看（NSFW）”？这将使得这篇树洞在首页不会显示文章预览，且其他人必须登录后才能查看该树洞。"
  />
  <v-switch v-if="isAdmin" v-model="isTop"
            :color="secondary"
            :disabled="isSending"
            label="将这篇树洞标记为置顶"
            messages="一篇置顶树洞将被始终显示在主页顶部，该选项仅管理员可用。"
  />
</template>

<script setup>
import Editor from "../components/create/Editor.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import TagSelector from "../components/create/TagSelector.vue";
import {checkUserLogin, fetchX} from "../service/frontend.ts";
import {backendApiUrl} from "../configurations/config.ts";
import {secondary} from "../themes/color.js";
import {useUserInfoStore} from "../stores/userInfo.js";

const userInfoStore = useUserInfoStore()
const isAdmin = computed(() => userInfoStore.isAdmin)

const router = useRouter()
const isSending = ref(false)
const error = ref(false)
const errorMessage = ref("")

const content = ref("")
const selectedTags = ref([])

const isNSFW = ref(false)
const isTop = ref(false)

const showImageUploader = ref(false)

onMounted(() => {
  // check now to sync can send status
  checkContent(content.value)
})

watch(content, (newVal) => {
  checkContent(newVal)
})

function checkContent(content) {
  if (content.trim().length === 0) {
    error.value = true
    errorMessage.value = '内容不能为空'
    return
  }
  error.value = false
  errorMessage.value = ''
}

function handleClickAppbarIcon() {
  router.push("/")
}

function handleClickLaunchBtn() {
  if (isSending.value) return;
  if (error.value) return;
  isSending.value = true
  fetchX(backendApiUrl + "/post/create", {
    method: "POST",
    body: JSON.stringify({
      content: content.value,
      tags: selectedTags.value,
      attributes: [].concat(isNSFW.value ? ["NSFW"] : []).concat(isTop.value ? ["Top"] : [])
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    if (res.status === 200) {
      router.push("/?snakebar=发布成功")
    } else {
      error.value = true
      errorMessage.value = "发送失败"
    }
  }).catch(() => {
    error.value = true
    errorMessage.value = "发送失败"
  }).finally(() => {
    isSending.value = false
  })
}

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

onMounted(() => {
  emit('modifytitle', '发布新树洞')
  emit('modifyicon', {
    icon: "mdi-arrow-left",
    tooltip: "返回主页",
    handler: handleClickAppbarIcon
  })
  emit('modifyactions', [
    {
      icon: "mdi-image-plus",
      tooltip: "上传图片",
      handler: () => {
        showImageUploader.value = true
      }
    },
    {
      icon: "mdi-send",
      tooltip: "发布",
      handler: handleClickLaunchBtn
    }
  ])
  checkUserLogin("/create")
})

</script>

<style scoped>

</style>
