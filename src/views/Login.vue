<template>
  <v-alert type="warning">在登录前，请详细阅读我们的
    <router-link to="/policy">隐私政策和服务条款</router-link>
    ，了解我们对个人信息的收集、使用方式，以便您更好地了解我们的服务并作出适当的选择。
  </v-alert>
  <v-spacer class="my-3"></v-spacer>
  <div class="page">
    <v-spacer class="flex-grow-1"></v-spacer>
    <div class="login_panel">
      <v-card variant="outlined" class="login_panel_surface">
        <v-card-item>
          <v-card-title><strong>选择一种登录方式以继续：</strong></v-card-title>
        </v-card-item>
        <v-card-text>
          <v-list>
            <v-list-item v-for="method in auth_methods" @click="handleClickAuthMethod(method)">
              <v-list-item-title>{{ method.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <div class="bottom">
          <v-card-actions>
            <v-btn @click="handleClickBack">
              返回上一页
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
    <v-spacer class="flex-grow-1"></v-spacer>
  </div>
</template>

<script setup>
import router from "../plugins/vuerouter.js";
import {onMounted} from "vue";
import {backendApiUrl} from "../configurations/config.ts";

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

onMounted(() => {
  emit('modifytitle', '登录到 XAUFEHole 西财树洞')
  emit('modifyicon', undefined)
  emit('modifyactions', undefined)
})

const auth_methods = [
  {
    name: "西安财经大学统一身份认证",
    href: "https://cas.xaufe.edu.cn/login?service=" + backendApiUrl + "/casAuth?redirectUrl=http://127.0.0.1:5173"
  }
]

function handleClickAuthMethod(method) {
  window.location.href = method.href
}

function handleClickBack() {
  router.back()
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
}

.login_panel {
  /*position: fixed;*/
  /*top: 40%;*/
  /*left: 50%;*/
  /*transform: translate(-50%, -50%);*/
  display: flex;
  flex-direction: column;
}

.login_panel_surface {
  display: flex;
  flex-direction: column;
}

.bottom {
  margin-bottom: 0.5%;
  margin-left: 0.5%;
}
</style>
