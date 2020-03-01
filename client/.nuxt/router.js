import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0baa9897 = () => interopDefault(import('../pages/secret.vue' /* webpackChunkName: "pages/secret" */))
const _2f26f089 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
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
    path: "/secret",
    component: _0baa9897,
    name: "secret"
  }, {
    path: "/signin",
    component: _2f26f089,
    name: "signin"
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
