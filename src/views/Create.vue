<template>
  <tag-selector :disabled="isSending" :max-tags="2"
                :tags="['日常', '生活', '科技','新人报到', '学习', '校园', '娱乐', '情感', '其他']"
                v-model="selectedTags">
  </tag-selector>
  <v-spacer class="my-3"></v-spacer>
  <editor :loading="isSending" :disabled="isSending" :error="error" :error-message="errorMessage"
          v-model="content"></editor>
</template>

<script setup>
import Editor from "../components/create/Editor.vue";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import TagSelector from "../components/create/TagSelector.vue";

const router = useRouter()
const isSending = ref(false)
const error = ref(false)
const errorMessage = ref("")

const content = ref("")
const selectedTags = ref([])

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
  //TODO
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
      icon: "mdi-send",
      tooltip: "发布",
      handler: handleClickLaunchBtn
    }
  ])
})

</script>

<style scoped>

</style>
