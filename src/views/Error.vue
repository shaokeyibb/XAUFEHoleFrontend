<template>
  发生了一个错误，请返回上一页，然后稍后再试
</template>

<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

function handleClickAppbarIcon() {
  router.back()
}

onMounted(() => {
  emit('modifytitle', "发生了一个错误")
  emit('modifyicon', {
    icon: "mdi-arrow-left",
    tooltip: "返回上一页",
    handler: handleClickAppbarIcon
  })
  emit('modifyactions', undefined)
})
</script>

<style scoped>

</style>
