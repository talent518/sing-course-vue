import user from "@api/user";
import { asyncRoutes } from "@/router";
console.log("xxxx")
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
