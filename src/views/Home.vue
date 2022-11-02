<template>
  <div v-for="data in topPosts">
    <preview-card :id="'post_'+data.id" :data="data"></preview-card>
    <v-spacer class="mb-3"></v-spacer>
  </div>
  <template v-if="topPosts && topPosts.length > 0">
    <v-divider class="mx-3 my-4" style="size: 16px"></v-divider>
  </template>
  <div v-for="data in preview_data">
    <preview-card :data="data" :id="'post_'+data.id"></preview-card>
    <v-spacer class="mb-3"></v-spacer>
  </div>
  <div class="no-more-post" id="no-more-post">
    <span class="no-more-post-content">已经到底了噢</span>
    <v-divider class="mx-16 my-4" style="size: 16px"></v-divider>
  </div>
  <fab-btn icon="mdi-plus" :color="secondary" size="x-large" @click="handleClickFabBtn">
    <v-icon size="large"></v-icon>
    <v-tooltip
        activator="parent"
        location="start"
        :attach="true"
    >发布树洞
    </v-tooltip>
  </fab-btn>
  <v-snackbar style="z-index: 9999" v-model="snackbar.enable">
    {{ snackbar.text }}

    <template v-slot:actions>
      <v-btn
          :color="secondary"
          variant="text"
          @click="snackbar.enable = false"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import {background, secondary, unimportant} from '../themes/color.js'
import FabBtn from "../components/FabBtn.vue";
import {computed, onActivated, onDeactivated, reactive, ref, watch} from "vue";
import {getQueryVariable, isInViewport} from "../utils/frontend.js";
import useAsyncComputed from "../utils/use-async-computed.ts";
import {fetchX} from "../service/frontend.ts";
import {backendApiUrl} from "../configurations/config.ts";
import PreviewCard from "../components/home/PreviewCard.vue";
import {useRouter} from "vue-router";
import {useUserInfoStore} from "../stores/userInfo.js";

const router = useRouter();
const userInfoStore = useUserInfoStore()

function handleClickAccountBtn() {
  router.push('/login')
}

function handleClickProfileBtn() {
  router.push('/profile')
}

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

const snackbar = reactive({
  enable: false,
  text: ""
})

const isUserLogin = computed(() => userInfoStore.hasLogin)

let timer

onActivated(() => {
  emit('modifytitle', undefined)
  emit('modifyicon', undefined)
  emit('modifyactions', [
    {
      icon: "mdi-account-circle",
      tooltip: "登录",
      handler: handleClickAccountBtn
    }
  ])
  if (getQueryVariable("snakebar") !== undefined) {
    snackbar.enable = true
    snackbar.text = decodeURIComponent(getQueryVariable("snakebar"))
    // remove parameter of the url
    history.replaceState(history.state, '', location.pathname)
  }
  timer = setInterval(() => {
    if (!isInViewport(document.getElementById("no-more-post"))) return;
    if (isLoading.value) return;
    if (current_page_data.value === undefined) return;
    isLoading.value = true
    page.value = page.value + 1
  }, 200)
  checkUserLogin(isUserLogin.value)
})

onDeactivated(() => {
  window.clearInterval(timer)
})

function checkUserLogin(isUserLogin) {
  if (isUserLogin) {
    onLogin()
  } else {
    onLogout()
  }
}

watch(isUserLogin, (newVal) => {
  checkUserLogin(newVal)
})

function onLogin() {
  emit('modifyactions', [
    {
      icon: "mdi-account-circle",
      tooltip: "我的档案",
      handler: handleClickProfileBtn
    }
  ])
}

function onLogout() {
  emit('modifyactions', [
    {
      icon: "mdi-account-circle",
      tooltip: "登录",
      handler: handleClickAccountBtn
    }
  ])
}

function handleClickFabBtn() {
  router.push("/create")
}

const page = ref(0)

const preview_data = reactive([])
const [current_page_data] = useAsyncComputed(() => fetchX(backendApiUrl + "/post/list?page=" + page.value).then(res => res.json()), undefined)

const isLoading = ref(false)

watch(current_page_data, (newVal) => {
  if (newVal && newVal.length !== 0) {
    preview_data.push(...newVal)
    isLoading.value = false
  }
})

const [topPosts] = useAsyncComputed(() => fetchX(backendApiUrl + "/post/top").then(res => res.json()), undefined)

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
  background-color: v-bind(background);
}
</style>
