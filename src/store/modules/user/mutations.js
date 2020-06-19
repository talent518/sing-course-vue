import { setStorage } from "@util/storage";

const mutations = {
  set_token(state, token) {
    state.token = token;
    setStorage('token', token);
  },
  set_userInfo(state, userInfo) {
    state.userInfo = userInfo;
    setStorage('userInfo', userInfo);

  },
};
export default mutations;
