import user from "@api/user";
import { setStorage } from "@util/storage";

const actions = {
  async userLogin({ commit }, param) {
    let data = await user.userLogin(param);
    commit('set_token', data.token);
    commit('set_userInfo', data.user_info);
    setStorage('token', data.token);
    setStorage('userInfo', data.user_info);
    return data;
  },
  async logout({ commit }) {
    await user.userLogout();
    commit('set_token', '');
    setStorage('token', '');
  },
};

export default actions;
