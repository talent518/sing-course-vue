const mutations = {
  set_token(state,token){
    state.token=token;
  },
  set_userInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  set_permissions(state, permissions) {
    state.permissions = permissions;
  },
};
export default mutations;
