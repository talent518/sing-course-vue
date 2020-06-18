import user from "@api/user";
import { setStorage } from "@util/storage";

const actions = {
  async userLogin({ commit }, param) {
    let data = await user.userLogin(param);
    commit('set_token',data.token);
    setStorage('token',data.token);
    return data;
  },
  async logout({ commit }) {
    await user.userLogout();
    commit('set_token','');
    setStorage('token','');
  },
};

export default actions;
