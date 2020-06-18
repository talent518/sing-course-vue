const url = {
  userLogin: `user/login`,
  userRetoken: "user/retoken",
  getuserView: `user/get-user-info`,
};
import ajax from "./ajax";

const prefix = process.env["VUE_APP_URI"];
const { get, post, patch, put, delete: del } = ajax(prefix)();
import { getStorage, setStorage } from "@util/storage";

class User {

  getCurrentUser() {
    return get(`${url.getuserView}`);
  }

  userLogin({ code }) {
    return post(`${url.userLogin}`, { code });
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
