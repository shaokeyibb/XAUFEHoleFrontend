import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ViewPost from '../views/View.vue'
import Create from "../views/Create.vue"
import Reply from "../views/Reply.vue"
import Policy from "../views/Policy.vue"

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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
