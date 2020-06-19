import router from "@/router";
import {getStorage} from "@util/storage";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({showSpinner: false});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  let token = getStorage("token");
  if (token) {
    if (to.path == '/login') {
      next("/");
    } else {
      if (!store.state || store.state.permission.addRoutes.length <= 0) {
        let newRoutes = await store.dispatch("permission/generateRoutes");
        router.addRoutes([
          ...newRoutes,
          {
            path: "*",
            redirect: "/index",
          },
        ]);
        next({...to, replace: true});
      } else {
        next();
      }
    }
  } else {
    if (to.path == '/login') {
      next();
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
