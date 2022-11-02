import {defineStore} from "pinia";
import {backendApiUrl} from "../configurations/config.ts";
import {fetchX} from "../service/frontend.ts";
import {computed, ref} from "vue";

export const useUserInfoStore = defineStore('user', () => {
    const info = ref(undefined)

    const hasLogin = computed(() => info.value !== null)

    async function updateUserInfoForce() {
        info.value = await fetchX(backendApiUrl + "/user/info", null, true)
            .then(res => res.json())
            .catch(() => info.value = null)
    }

    async function updateUserInfo() {
        if (info.value === undefined) {
            await updateUserInfoForce()
        }
    }

    function logout() {
        info.value = null
    }

    return {info, hasLogin, logout, updateUserInfo, updateUserInfoForce}
})
