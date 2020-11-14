import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2f26f089 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _5940a1f7 = () => interopDefault(import('../pages/tasks.vue' /* webpackChunkName: "pages/tasks" */))
const _70508154 = () => interopDefault(import('../pages/reset/_id/_token.vue' /* webpackChunkName: "pages/reset/_id/_token" */))
const _1d4b0d3b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/signin",
    component: _2f26f089,
    name: "signin"
  }, {
    path: "/tasks",
    component: _5940a1f7,
    name: "tasks"
  }, {
    path: "/reset/:id?/:token?",
    component: _70508154,
    name: "reset-id-token"
  }, {
    path: "/",
    component: _1d4b0d3b,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
