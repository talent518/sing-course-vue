import { getStorage } from "@util/storage";

const getters = {
  userInfo(state) {
    if (!state.userInfo) {
      state.userInfo = getStorage('userInfo');
      if (state.userInfo)
        state.userInfo = JSON.parse(state.userInfo);
    }
    return state.userInfo;
  },
  token(state) {
    if (!state.token)
      state.token = getStorage('token');
    return state.token;
  }
};
export default getters;
