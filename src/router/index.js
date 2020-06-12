import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login.vue";
import home from "@/views/Home.vue";
import AppMain from "@/views/AppMain.vue";
import user from "@api/user";
import {getStorage} from "@util/storage";
import store from "../store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({showSpinner: false});
Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
const loginUrl = "/login";
const loginV = "login";
// router.beforeEach(async (to, from, next) => {
//   let token = getStorage("token");
//   if (token) {
//     if (to.name === loginV) {
//       next({ name: "index" });
//     } else {
//       next();
//     }
//   } else {
//     if (to.name === loginV) {
//       next();
//     } else {
//       next({ name: "login" });
//     }
//   }
// });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  let isValid = await user.userRetoken();
  if (isValid) {
    if (!(store.state && store.state.menu.hasPermission)) {
      let newRoutes = await store.dispatch("menu/getMenu");

      router.addRoutes([
        {
          path: "/login",
          name: "login",
          component: login,
        },
        ...newRoutes,
        {
          path: "*",
          redirect: "/index",
        },
      ]);
      next({...to, replace: true});
      // 动态添加我需要的路由


    }
    if (to.name == loginV) {
      next("/");
    } else {
      next();
      NProgress.done();
    }
  } else {
    if (to.path !== loginUrl) {
      next({name: "login"});
    } else {
      next();
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
