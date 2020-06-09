import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  menu: {},
  auths: [],
  buttons: [],
  name: "",
  hasPermission: false,
  operateMenu: {},
  allMenu: [],
  allAuths: [],
  allButtons: [],
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
