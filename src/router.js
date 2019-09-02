import Vue from 'vue'
import Router from 'vue-router'

import { auth } from "@/firebase";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Home.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/ingreso',
            name: 'ingreso',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Ingreso.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Admin.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/chat',
            name: 'chat',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Chat.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const user = auth.currentUser
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (user) {
            next()
        } else {
            next({ name: 'ingreso' })
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router