import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  userInfo: undefined,
  token: undefined
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
