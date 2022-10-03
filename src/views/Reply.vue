<template>
  <editor :loading="isSending" :disabled="isSending" :error="error" :error-message="errorMessage"
          v-model="content" label="想对大家说点什么？"></editor>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import Editor from "../components/create/Editor.vue";

const router = useRouter()
const route = useRoute()

const isSending = ref(false)
const error = ref(false)
const errorMessage = ref("")

const content = ref("")

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
  //TODO
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
      icon: "mdi-send",
      tooltip: "发布",
      handler: handleClickLaunchBtn
    }
  ])
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