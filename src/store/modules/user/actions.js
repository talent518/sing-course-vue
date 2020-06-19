import user from "@api/user";

const actions = {
  async userLogin({ commit }, param) {
    let data = await user.userLogin(param);
    commit('set_token', data.token);
    commit('set_userInfo', data.user_info);
    return data;
  },
  async logout({ commit }) {
    await user.userLogout();
    commit('set_token', '');
    commit('set_userInfo', '');
  },
};

export default actions;
