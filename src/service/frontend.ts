import router from '../plugins/vuerouter.js'
import {nextTick} from "vue";
import {useUserInfoStore} from '../stores/userInfo.js';

function handleResponseBody(response: Response) {
    switch (response.status) {
        case 301:
        case 302: {
            const location = response.headers.get('Location')
            if (location) {
                window.location.href = location
            }
            break
        }
        case 401: {
            useUserInfoStore().logout()
            router.push("/login")
            break
        }
        case 404: {
            router.push({name: 'error', params: {code: 404}})
            break
        }
        case 502: {
            router.push({name: 'error', params: {code: 502}})
            break
        }
    }
}

export function fetchX(input: RequestInfo | URL, init?: RequestInit, bypassGlobalResponseHandle?: boolean): Promise<Response> {
    return fetch(input, init).then(response => {
        if (bypassGlobalResponseHandle !== true) {
            handleResponseBody(response)
        }
        return response;
    })
}

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => alert("内容已复制到剪贴板"))
}

export function checkUserLogin(redirect?: string) {
    if (!useUserInfoStore().hasLogin) {
        nextTick(() => {
            alert("您还尚未登录，请先登录后再进行操作")
            router.push("/login" + (redirect ? "?redirect=" + encodeURIComponent(redirect) : ""))
        })
    }
}
