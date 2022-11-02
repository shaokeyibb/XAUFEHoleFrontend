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
          <v-list :active-color="primary">
            <v-list-item v-for="method in authMethods" :key="method.name" @click="selectedName=method.name"
                         :active="selectedName===method.name">
              <v-list-item-title>{{ method.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-spacer class="my-3"></v-spacer>
          <div class="additional_params">
            <div v-if="selectedMethod" v-for="param in selectedMethod.additionalParams">
              <div v-if="param.required.value">
                <div v-if="param.type===String">
                  <v-text-field v-model="appliedAdditionalParams[param.name]"
                                :label="param.label"
                                :hint="param.detail"
                                :type="param.password ? 'password' : 'text'"
                                :persistent-hint="true"></v-text-field>
                  <template v-if="param.captcha">
                    <img :src="captchaUrls[selectedMethod.name][param.name]" alt="captcha"
                         @click="refreshCaptcha(param)">
                  </template>
                </div>
                <div v-else-if="param.type===Boolean">
                  <v-switch v-model="appliedAdditionalParams[param.name]"
                            :color="secondary"
                            :label="param.label"
                            :messages="param.detail"
                  ></v-switch>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <div class="bottom">
          <v-card-actions>
            <v-btn @click="handleClickLogin" :disabled="!checkCanLogin">
              登录
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
    <v-spacer class="flex-grow-1"></v-spacer>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {backendApiUrl} from "../configurations/config.ts";
import {primary, secondary} from "../themes/color.js";
import useAsyncComputed from "../utils/use-async-computed.ts";
import {fetchX} from "../service/frontend.ts";
import {useRouter} from "vue-router";
import {getQueryVariable} from "../utils/frontend.js";

const router = useRouter();

const emit = defineEmits(['modifytitle', 'modifyicon', 'modifyactions'])

onMounted(() => {
  emit('modifytitle', '登录到 XAUFEHole 西财树洞')
  emit('modifyicon', {
    icon: "mdi-arrow-left",
    tooltip: "返回上一页",
    handler: handleClickAppbarIcon
  })
  emit('modifyactions', undefined)
})

const [needWebVpnCookie] = useAsyncComputed(() => {
  return fetchX(backendApiUrl + "/webvpn/available").then(res => res.json()).then(res => !res.available)
}, true)

const selectedName = ref(undefined)
const selectedMethod = computed(() => {
  return authMethods.find(method => method.name === selectedName.value)
})
const appliedAdditionalParams = reactive({})

const requireRegistrationCode = ref(false)

const requireCaptcha = computed(() => appliedAdditionalParams['registerMode'] !== false)

const authMethods = [
  // {
  //   name: "西安财经大学统一身份认证（不可用）",
  //   href: "https://cas.xaufe.edu.cn/login?service=" + encodeURIComponent(backendApiUrl) + "/auth/casAuth?redirectUrl=" + btoa(frontendUrl + "/?snakebar=" + encodeURIComponent("登录成功，欢迎回来！")),
  //   method: "DIRECT",
  //   additionalParams: [
  //     {
  //       type: String,
  //       name: "webVpnCookie",
  //       required: needWebVpnCookie,
  //       default: undefined,
  //       label: "西安财经大学 WebVPN Cookie",
  //       detail: "由于技术限制，我们需要您在登录前向我们提供您 WebVPN 的 Cookie 信息以确保登录系统正常运行：请使用电脑访问 https://webvpn.xaufe.edu.cn，并使用统一身份认证系统登录您的 WebVPN，接下来，点击您浏览器地址栏左侧的锁型按钮，点击 “Cookies”，顺次展开 “Cookies”，“webvpn.xaufe.edu.cn”，找到 “wengine_vpn_ticketwebvpn_xaufe_edu_cn” 键，将 “内容” 一栏旁的值复制到上方的输入框中，再点击 “登录” 即可完成登录。"
  //     },
  //     {
  //       type: Boolean,
  //       name: "doShareWebVpnCookie",
  //       required: needWebVpnCookie,
  //       default: false,
  //       label: "向我们共享您的 WebVPN Cookie",
  //       detail: "是否向使用本站服务的其他用户共享您的 WebVPN Cookie 信息，这将使得您和其他人在下次可以跳过该繁琐的步骤，在您的 WebVPN Cookie 到期前，直接登录本站。我们会按照我们的隐私政策，严格保护您的 Cookie 信息。如您选择不共享，则该 Cookie 将会在本次使用过后被直接丢弃，不会储存。"
  //     }
  //   ]
  // },
  // {
  //   name: "西安财经大学教育邮箱登录（推荐）",
  //   href: backendApiUrl + "/auth/emailAuth",
  //   method: "POST",
  //   additionalParams: [
  //     {
  //       type: String,
  //       name: "username",
  //       required: ref(true),
  //       default: undefined,
  //       label: "账号（教育邮箱地址）",
  //       detail: "西安财经大学教育邮箱地址一般以 @xaufe.edu.cn 或 @mail.xaufe.edu.cn 结尾。任何西安财经大学学生都可以申请一个教育邮箱，如果您还没有一个教育邮箱，请访问西安财经大学一站式服务平台 http://my.xaufe.edu.cn，然后点击顶部的“申请邮箱”按钮申请一个。"
  //     },
  //     {
  //       type: String,
  //       name: "password",
  //       password: true,
  //       required: ref(true),
  //       default: undefined,
  //       label: "密码",
  //       detail: "输入您的西财树洞账号密码（不是您的教育邮箱密码！）。如果您还没有登录过西财树洞，则请选中下方的'注册账号模式'来注册一个账号"
  //     },
  //     {
  //       type: String,
  //       name: "captcha",
  //       captcha: true,
  //       captchaUrl: backendApiUrl + "/captcha/generate",
  //       required: ref(true),
  //       default: undefined,
  //       label: "验证码",
  //       detail: "请正确输入下方的验证码"
  //     },
  //     {
  //       type: String,
  //       name: "registrationCode",
  //       required: requireRegistrationCode,
  //       default: undefined,
  //       label: "注册验证码",
  //       detail: "不出意外的话，我们已将一封包含验证码的邮件发送给您，请查看您的收件箱（有时候它会在垃圾箱中），并将其中的验证码输入到此处。"
  //     },
  //     {
  //       type: Boolean,
  //       name: "registerMode",
  //       required: ref(true),
  //       default: false,
  //       label: "注册账号模式",
  //       detail: "如果您还没有登录过西财树洞，则请选中此项以使用您输入的账号和密码注册一个账号。"
  //     }
  //   ]
  // },
  {
    name: "通过电子邮箱登录",
    href: backendApiUrl + "/auth/emailAuth",
    method: "POST",
    additionalParams: [
      {
        type: String,
        name: "username",
        required: ref(true),
        default: undefined,
        label: "电子邮件地址（账号）",
        detail: "请输入您的电子邮件地址，例如 example@xctra.cn"
      },
      {
        type: String,
        name: "password",
        password: true,
        required: ref(true),
        default: undefined,
        label: "密码",
        detail: "输入您西财树洞账号的密码。如果您还没有登录过西财树洞，则请选中下方的'注册账号模式'来注册一个账号"
      },
      {
        type: String,
        name: "captcha",
        captcha: true,
        captchaUrl: backendApiUrl + "/captcha/generate",
        required: requireCaptcha,
        default: undefined,
        label: "验证码",
        detail: "请正确输入下方的验证码"
      },
      {
        type: String,
        name: "registrationCode",
        required: requireRegistrationCode,
        default: undefined,
        label: "注册验证码",
        detail: "不出意外的话，我们已将一封包含验证码的邮件发送给您，请查看您的收件箱（有时候它会在垃圾箱中），并将其中的验证码输入到此处。"
      },
      {
        type: Boolean,
        name: "registerMode",
        required: ref(true),
        default: false,
        label: "注册账号模式",
        detail: "如果您还没有登录过西财树洞，则请选中此项以使用您输入的电子邮件地址（账号）和密码注册一个账号。"
      }
    ]
  }
]

const checkCanLogin = computed(() => {
  if (!selectedMethod.value) {
    return false;
  }
  for (const param of selectedMethod.value.additionalParams) {
    if (param.required.value && appliedAdditionalParams[param.name] === undefined) {
      return false;
    }
  }
  return true;
})

function handleClickLogin() {
  if (selectedMethod.value.method === "DIRECT") {
    window.location.href = selectedMethod.value.href + encodeURIComponent("&" + Object.entries(appliedAdditionalParams).map(([key, value]) => key + "=" + value).join("&"))
  } else {
    fetchX(selectedMethod.value.href, {
      method: selectedMethod.value.method,
      body: JSON.stringify(appliedAdditionalParams),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        refreshCaptcha("captcha");
        router.push(
            (getQueryVariable("redirect") ? decodeURIComponent(getQueryVariable("redirect")) : "/") +
            (getQueryVariable("redirect") ? "" : "?snakebar=" + encodeURIComponent("登录成功，欢迎回来！"))
        )
      } else if (res.status === 202) {
        requireRegistrationCode.value = true
        throw new Error("我们已将一封验证邮件发送到你的邮箱中，请查看后在本界面中输入验证码以完成登录。");
      } else {
        res.text().then(text => {
          alert("登录失败，原因：" + text);
        })
        refreshCaptcha("captcha");
      }
    }).catch(err => {
      alert(err.message);
      refreshCaptcha("captcha");
    })
  }
}

function handleClickAppbarIcon() {
  router.back()
}

const captchaUrls = ref({})

authMethods.forEach(method => {
  if (method.additionalParams) {
    method.additionalParams.forEach(param => {
      if (param.captchaUrl) {
        if (!captchaUrls.value[method.name]) {
          captchaUrls.value[method.name] = {}
        }
        captchaUrls.value[method.name][param.name] = param.captchaUrl
      }
    })
  }
})

function refreshCaptcha(param) {
  const p = typeof param === 'object' ? param : selectedMethod.value.additionalParams.find(p => p.name === param)
  captchaUrls.value[selectedMethod.value.name][p.name] = p.captchaUrl + "?t=" + Date.now()
}

watch(selectedMethod, (newVal) => {
  newVal.additionalParams.forEach(param => {
    if (param.default !== undefined) {
      appliedAdditionalParams[param.name] = param.default
    }
  })
})

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
