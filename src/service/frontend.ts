import router from '../plugins/vuerouter.js'

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
