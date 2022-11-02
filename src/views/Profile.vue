<template>
  当你看到这个界面的时候说明你已经登录成功了，但是我暂时懒得写这个界面了，所以，凑活看吧（
  <br>
  <v-btn @click="handleClickLogout">退出登录</v-btn>
</template>

<script setup>

import {fetchX} from "../service/frontend.ts";
import {backendApiUrl} from "../configurations/config.ts";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useUserInfoStore} from "../stores/userInfo";

const router = useRouter()
const userInfoStore = useUserInfoStore()

function handleClickLogout() {
  fetchX(backendApiUrl + "/auth/logout", {
    method: "GET"
  }).then((res) => {
    if (res.status === 200) {
      router.push("/?snakebar=退出登录成功")
    }
  })
  userInfoStore.logout()
}

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

function handleClickAppbarIcon() {
  router.back()
}

onMounted(() => {
  emit('modifytitle', "我的档案")
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
