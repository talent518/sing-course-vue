import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  routes: [],
  addRoutes: [],
  permissions: undefined,
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
