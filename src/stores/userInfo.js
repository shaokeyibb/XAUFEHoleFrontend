import {defineStore} from "pinia";
import {backendApiUrl} from "../configurations/config.ts";
import {fetchX} from "../service/frontend.ts";
import {computed, ref} from "vue";

export const useUserInfoStore = defineStore('user', () => {
    const info = ref(undefined)

    const hasLogin = computed(() => info.value !== undefined)

    async function injectUserInfo() {
        info.value = await fetchX(backendApiUrl + "/user/info", null, true)
            .then(res => res.json())
            .catch(() => info.value = undefined)
    }

    function logout() {
        info.value = undefined
    }

    return {info, hasLogin, logout, injectUserInfo}
})
