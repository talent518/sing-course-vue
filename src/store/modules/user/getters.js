const getters = {
  getpPrmissions(state) {
    return state.permissions;
  },
  userInfo(state) {
    return state.userInfo;
  },
  getToken(state){
    return state.token;
  }
};
export default getters;
