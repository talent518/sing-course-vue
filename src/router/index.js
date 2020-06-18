import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import baseRouter from './modules/base'
import teachingRouter from './modules/teaching'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/index',
    component: () => import('@/views/main'),
    hidden: true,
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  baseRouter,
  teachingRouter
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router