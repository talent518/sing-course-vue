import router from "@/router";
import {getStorage} from "@util/storage";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({showSpinner: false});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  let token = store.getters["user/token"];
  if (token) {
    if (to.path == "/login") {
      const query = to.query;
      let code = query.code;
      if (code) {
        next();
      } else {
        next("/");
      }
    } else {
      if (!store.state || !store.state.permission.permissions) {
        let permissions = await store.dispatch("permission/getPermissions");
        let newRoutes = await store.dispatch(
          "permission/generateRoutes",
          permissions
        );
        /*console.log("aaaaa")*/
        /*console.log(newRoutes);*/
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
    if (to.path == "/login") {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
