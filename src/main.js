import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import router from "./plugins/vuerouter.js";
import {VueShowdownPlugin} from 'vue-showdown';
import {vueshowdown_conf} from "./plugins/vueshowdown.js";
import {pinia} from "./plugins/pinia.js";

loadFonts()

createApp(App)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueShowdownPlugin, vueshowdown_conf)
    .mount('#app')

console.log(`
XAUFEHole 西财树洞 Frontend.
Powered by Vue.js. Made by HikariLan.
©2022 XAUFE Computer Technology Research Association, all rights reserved.
`.trim()
)
