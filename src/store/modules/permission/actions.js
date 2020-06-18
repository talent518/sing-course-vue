import { asyncRoutes } from '@/router'

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes=asyncRoutes;
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // filterAsyncRoutes(routes, roles) {
  //   const res = []
  //   routes.forEach(route => {
  //     const tmp = { ...route }
  //     if (hasPermission(roles, tmp)) {
  //       if (tmp.children) {
  //         tmp.children = filterAsyncRoutes(tmp.children, roles)
  //       }
  //       res.push(tmp)
  //     }
  //   })
  //   return res
  // }
};

export default actions;
