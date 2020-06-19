const url = {
  userLogin: `user/login`,
  userLogout: `user/logout`,
  userRetoken: "user/retoken",
  getuserView: `user/get-user-info`,
  getPermissions: `user/get-permissions`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_API"];
const { get, post, patch, put, delete: del } = ajax(prefix)();
import { getStorage, setStorage } from "@util/storage";

class User {

  getCurrentUser() {
    return get(`${url.getuserView}`);
  }

  getPermissions() {
    return get(`${url.getPermissions}`);
  }

  userLogin({ code }) {
    return post(`${url.userLogin}`, { code });
  }

  userLogout() {
    return post(`${url.userLogout}`);
  }

  async userRetoken() {
    let token = getStorage("token");
    let data = await get(`${url.userRetoken}`);
    if (data.code !== 401) {
      setStorage("token", data);
      return true;
    }
    return false;
  }
}

export default new User();
