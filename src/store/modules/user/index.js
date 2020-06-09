import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  user: {},
  userInfo: {},
  role: [],
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
