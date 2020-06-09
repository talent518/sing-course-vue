import user from "@api/user";
import {setLocal} from "@util/local";

const actions = {
  async userLogin({commit}, param) {
    let data = await user.userLogin(param);
    commit("set_user", data);
    setLocal("token", data.token);
    // setLocal("user", data);
    return data;
  },
  async getUserInfo({commit}) {
    let data = await user.getCurrentUser();
    //commit("set_userInfo", data);
    commit("set_userInfo", data);
  },

  async addUser({commit}, param) {
    let data = await user.postUser(param);
    return data;
  },
  async getRole({commit}, param) {
    let data = await user.getRole(param);
    commit("set_Roles", data);
  },
};

export default actions;
