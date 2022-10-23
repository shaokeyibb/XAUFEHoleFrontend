import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ViewPost from '../views/View.vue'
import Create from "../views/Create.vue"
import Reply from "../views/Reply.vue"
import Policy from "../views/Policy.vue"
import Profile from "../views/Profile.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/view/:id',
        name: 'View Post',
        component: ViewPost
    },
    {
        path: '/create',
        name: 'Create Post',
        component: Create
    },
    {
        path: '/reply/:id/',
        name: 'Reply post',
        component: Reply
    },
    {
        path: '/reply/:id/:subId',
        name: 'Reply comment',
        component: Reply
    },
    {
        path: '/policy',
        name: 'Privacy Policy and User Agreement',
        component: Policy
    },
    {
        path: '/profile',
        name: 'My Profile',
        component: Profile
    },
    {
        path: "/:catchAll(.*)*",
        component: () => import("../views/Error.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (to.hash) {
                    const el = window.location.href.split('#')[1]
                    if (el.length) {
                        document.getElementById(el).scrollIntoView({
                            block: "start",
                            inline: "nearest",
                            behavior: 'smooth'
                        })
                    }
                } else if (savedPosition) {
                    resolve(savedPosition)
                } else if (from.name === 'View Post' && to.name === 'Home') {
                    const el = document.getElementById(`post_${from.params.id}`)
                    if (el) {
                        el.scrollIntoView(true)
                    }
                } else {
                    document.getElementById('app').scrollIntoView()
                }
            }, 500)
        })
    }
})

export default router
