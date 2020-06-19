import { constantRoutes } from '@/router'

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
};
export default mutations;
