import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import { getStorage } from "@util/storage";

const state = {
  userInfo: {},
  permissions: undefined,
  token: getStorage('token')
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
