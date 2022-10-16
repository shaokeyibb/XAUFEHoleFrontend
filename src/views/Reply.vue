<template>
  <editor :loading="isSending" :disabled="isSending" :error="error" :error-message="errorMessage"
          v-model="content" label="想对大家说点什么？" v-model:show-image-uploader="showImageUploader"></editor>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import Editor from "../components/create/Editor.vue";
import {backendApiUrl} from "../configurations/config.ts";
import {checkUserLogin, fetchX} from "../service/frontend.ts";
import {getFullPosterNameByIndex, getQueryVariable} from "../utils/frontend.js";

const router = useRouter()
const route = useRoute()

const isSending = ref(false)
const error = ref(false)
const errorMessage = ref("")

const content = ref("")

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

function handleClickAppbarIcon(id, subId) {
  router.push("/view/" + id + (subId ? ("#" + subId) : ""))
}

function handleClickLaunchBtn() {
  if (isSending.value) return;
  if (error.value) return;
  isSending.value = true
  fetchX(backendApiUrl + "/post/reply", {
    method: "PUT",
    body: JSON.stringify({
      id: route.params.id,
      content: content.value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    if (res.status === 200) {
      router.push("/view/" + route.params.id)
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

function initial(id, subId) {
  const fullId = '#' + id + (subId ? ('-' + subId) : '')
  emit('modifytitle', '回复 ' + fullId)
  emit('modifyicon', {
    icon: "mdi-arrow-left",
    tooltip: "返回 " + fullId,
    handler: () => handleClickAppbarIcon(id, subId)
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
  if (subId) {
    checkUserLogin("/reply/" + id + "/" + subId)
    if (getQueryVariable("poster_index") !== undefined) {
      content.value = "回复 " + fullId + "：@" + getFullPosterNameByIndex(getQueryVariable("poster_index")) + " " + content.value
      // remove parameter of the url
      history.replaceState(null, null, location.pathname + "#/reply/" + id + "/" + subId)
    }
  } else {
    checkUserLogin("/reply/" + id)
  }
}

onMounted(() => {
  initial(route.params.id, route.params.subId)
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id || to.params.subId !== from.params.subId) {
    initial(to.params.id, to.params.subId)
  }
})

</script>

<style scoped>

</style>
