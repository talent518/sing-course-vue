import user from "@api/user";
import { asyncRoutes } from "@/router";

import { cloneDeep } from "lodash";
const actions = {
  async getPermissions({ commit }) {
    let data = await user.getPermissions();
    commit("SET_PERMISSIONS", data);
    return data;
  },
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes = asyncRoutes;
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      let applicationRouter = cloneDeep(asyncRoutes);
      let newRoutes = createRouter(applicationRouter, roles);
      let targetRouter = flatten(applicationRouter);
      let menus = [];
      roles.forEach((i) => {
        targetRouter.forEach((r) => {
          if (i.menuKey === r.name) {
            menus.push({ ...i, ...r });
          }
        });
      });
      accessedRoutes = createTreeMenu(menus);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

export default actions;
function createRouter(routers, authRouter, arr = []) {
  routers.forEach((router) => {
    if (router.children) {
      let children = router.children;
      if (router.show) {
        delete router.children;
        arr.push(router);
      }
      createRouter(children, authRouter, arr);
    } else {
      authRouter.findIndex((i) => {
        if (i.menuKey === router.name && router.router != null) {
          arr.push(router);
        }
      });
    }
  });
  return arr;
}

function createTreeMenu(menus, key = "parentId", value = 0, arr = []) {
  menus.forEach((menu) => {
    if (menu[key] == value) {
      arr.push(menu);
      menu.children = [];
      createTreeMenu(menus, key, menu.menuId, menu.children);
    }
  });
  return arr;
}

function flatten(routers, arr = []) {
  routers.forEach((r) => {
    arr.push(r);
    if (r.children) {
      let children = r.children;
      delete r.children;
      flatten(children, arr);
    }
  });
  return arr;
}
