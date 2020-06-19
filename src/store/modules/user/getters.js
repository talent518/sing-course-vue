import { getStorage } from "@util/storage";

const getters = {
  userInfo(state) {
    if (!state.userInfo)
      state.token = getStorage('userInfo');
    return state.userInfo;
  },
  token(state) {
    if (!state.token)
      state.token = getStorage('token');
    return state.token;
  }
};
export default getters;
