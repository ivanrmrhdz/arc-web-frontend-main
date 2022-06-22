import Vue from 'vue'
import VueRouter from 'vue-router'
import routersInfo from './routers-info'

const keys = Object.keys(routersInfo);

Vue.use(VueRouter)

const routes = keys.map(key => routersInfo[key])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
